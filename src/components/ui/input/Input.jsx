import React from "react";
import { useController } from "react-hook-form";
import Label from "./Label";

const Input = ({ type = "text", name, control, display, ...props }) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <div>
      <Label display={display} htmlFor={name}></Label>
      <input
        type={type}
        name={name}
        id={name}
        {...props}
        {...field}
        className="block
        w-full
        px-4
        py-2
        text-base
        font-normal
        text-gray-700
        bg-gray-100 bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      />
    </div>
  );
};

export default Input;
