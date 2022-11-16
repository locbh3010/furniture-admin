import React from "react";
import { useController } from "react-hook-form";

const Checkbox = ({ control, name, display, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: props.value,
  });
  return (
    <div>
      <label htmlFor={name} className="inline-flex items-center">
        <input
          type="checkbox"
          className="form-checkbox"
          name={name}
          id={name}
          {...field}
          {...props}
          defaultChecked={props.value}
        />
        <span className="ml-2 select-none">{display}</span>
      </label>
    </div>
  );
};

export default Checkbox;
