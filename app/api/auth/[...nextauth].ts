import NextAuth from 'next-auth';
import { compare } from 'bcrypt';

import Credentials from 'next-auth/providers/credentials';

import prismadb from '@/lib/prismadb';

export default NextAuth({
  providers: [
    Credentials({
      id: '',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const validadData = (credentials && credentials?.email && credentials?.password);
          if(validadData) {
            const user = await prismadb.user.findUnique({
              where: { email: credentials.email }
            })

            if(!(user && user.hashedPassword)){
              throw Error('User incorrect email or password');
            }

            const isVerified = await compare(credentials?.password, user?.hashedPassword)
            if(!isVerified) {
              throw Error('User incorrect password');
            }
            return user;
          }
          throw Error('Email and password required');
        } catch (e) {
          return null;
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth'
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: any){
      console.log(token)
      return session;
    }
  }
});