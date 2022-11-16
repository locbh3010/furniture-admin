import React from "react";
import Label from "./Label";

const InputFile = ({ name, ...props }) => {
  return (
    <div>
      <Label display="Chọn hình ảnh" htmlFor={name} />
      <input
        type="file"
        name={name}
        id={name}
        className="appearance-none file:outline-none bg-gray-300 text-slate-900 border border-gray-400 rounded file:border-none file:bg-slate-900 file:px-8 file:py-4 duration-300 focus:bg-transparent file:text-white file:mr-5 block w-full"
        accept="image/png, image/jpeg, image/webp, image/jpg, image/gif"
        {...props}
      />
      <span className="text-sm text-slate-400 -mt-1">PNG, JPG or WEBP</span>
    </div>
  );
};

export default InputFile;
