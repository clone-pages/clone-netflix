"use client"

import React from "react";

interface InputProps {
  id: string;
  value: string;
  label: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps) {
  const {id, type, value, label, onChange} = props;

  return (
    <div className={"relative"}>
      <input
        className={"block rounded-md px-6 pt-6 pb-1 w-full text-md text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"}
        placeholder={""}
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={"off"}
      />
      <label
        htmlFor={id}
        className={"absolute text-md text-zinc-400 peer-placeholder-shown:translate-y-0 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-3"}
      >
        {label}
      </label>
    </div>
  );
}