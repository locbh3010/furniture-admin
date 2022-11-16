import React from "react";
import JoditEditor from "jodit-react";
import { useController } from "react-hook-form";
import Label from "./Label";

const Editor = ({ name, display, control, ...props }) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <div>
      <Label display={display} htmlFor={name} />
      <JoditEditor {...field} {...props} />
    </div>
  );
};

export default Editor;
