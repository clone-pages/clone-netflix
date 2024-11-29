'use client'

import React from "react";
import Input from '@/components/Input';

export default function Page ()
{
  const [email, setEmail] = React.useState('');

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  return (
    <div className={'relative h-full w-full bg-[url("/images/hero.jpg")] bg-no-repeat bg-center bg-fixed bg-cover'}>
      <div className={'bg-black w-full h-full lg:bg-opacity-50'}>
        <nav className={'px-12 py-5'}>
          <img src="/images/logo.png" alt="Logo de aplicacion" className={'h-12'} />
        </nav>
        <div className={'flex justify-center'}>
          <div className={'bg-black bg-opacity-70 p-6 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'}>
            <h2 className={'text-white text-4xl mb-8 font-semibold'}>Sign In</h2>
            <div className={'flex flex-col gap-4'}>
              <Input
                label={'Email'}
                id={'email'}
                type={'email'}
                value={email}
                onChange={handlerOnChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}