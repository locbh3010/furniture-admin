import React from "react";

const Label = ({ display, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="inline-block mb-2 text-gray-700 font-medium"
    >
      {display}
    </label>
  );
};

export default Label;
