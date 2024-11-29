import { hashSync } from 'bcrypt';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export const POST = async (req: Request, res: Response) => {
  try {
    const {email, password, username} = await req.json()
    const exist = await prismadb.user.findUnique({
      where: {
        email,
      }
    })

    if(exist) {
      return NextResponse.json({
        error: 'Email already exists'
      })
    }

    const hashedPassword = hashSync(password, 12)
    const user = await prismadb.user.create({
      data: {
        email,
        name: username,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      }
    })
    return NextResponse.json({
      user
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({
      error: e
    })
  }
}