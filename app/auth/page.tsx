"use client";

import axios from 'axios';
import { signIn } from 'next-auth/react'
import { useCallback, useState, FormEvent, ChangeEvent } from "react";

import Input from "@/components/Input";

export default function Page() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  });

  const [variant, setVariant] = useState('login');
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login' );
  }, [])

  const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const handlerSubmit = useCallback(async (e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    if(variant === 'login') {
      try {
        console.log('login')
        // await signIn('credentials', {
        //   email: form.email,
        //   password: form.password,
        //   // redirect: false,
        //   // callbackUrl: '/'
        // }).then(function(e) {
        //   console.log(e)
        // }).catch(function(e){
        //   console.log(e)
        // })
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        await axios.post('/api/auth', {
          ...form
        })
      }catch (e) {
        console.log(e);
      }
    }
  }, [form, variant])

  return (
    <div className={"relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover"}>
      <div className={"bg-black w-full h-full lg:bg-opacity-50"}>
        <nav className={"px-12 py-5"}>
          <img src="/images/logo.png" alt="Logo de aplicacion" className={"h-12"} />
        </nav>
        <div className={"flex justify-center"}>
          <div className={"bg-black bg-opacity-70 p-6 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full"}>
            <h2 className={"text-white text-4xl mb-8 font-semibold"}>
              { variant === 'login' ? 'Sign in' : 'Create an account' }
            </h2>
            <div className={"flex flex-col gap-4"}>
              <form onSubmit={handlerSubmit}>
                {
                  variant === 'register' && (
                    <Input
                      label={"Username"}
                      className={'mb-4'}
                      id={"username"}
                      type={"text"}
                      value={form.username}
                      onChange={handlerOnChange}
                    />
                  )
                }
                <Input
                  label={"Email"}
                  id={"email"}
                  type={"email"}
                  className={'mb-4'}
                  value={form.email}
                  onChange={handlerOnChange}
                />
                <Input
                  label={"Password"}
                  id={"password"}
                  type={"password"}
                  value={form.password}
                  onChange={handlerOnChange}
                />
                <button
                  className={'bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'}
                >
                  {variant === 'login' ? 'Login' : 'Sign up'}
                </button>
                <p className={'text-neutral-500 mt-12'}>
                  {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                  <span onClick={toggleVariant} className={'text-white ml-1 hover:underline cursor-pointer'}>
                    {variant === 'login' ? 'Create an account' : 'Login'}
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}