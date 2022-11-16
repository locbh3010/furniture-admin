import React from "react";
import { useController } from "react-hook-form";
import Label from "../../ui/input/Label";

const Select = ({ display, control, name, children, ...props }) => {
  const { field } = useController({
    control,
    name,
  });
  return (
    <div className="block">
      <Label display={display} htmlFor={name} />
      <select
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none appearance-none"
        name={name}
        id={name}
        {...field}
        {...props}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
