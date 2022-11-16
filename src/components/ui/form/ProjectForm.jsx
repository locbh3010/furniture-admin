import React from "react";
import { useForm } from "react-hook-form";
import Editor from "../input/Editor";
import Input from "../input/Input";

const ProjectForm = ({ type = "add" }) => {
  const { control, handleSubmit } = useForm({
    mode: onchange,
  });
  const handleAddProject = (value) => {
    console.log("add");
  };
  const handleUpdateProject = (value) => {
    console.log("update");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          type === "add" ? handleAddProject : handleUpdateProject
        )}
      >
        <div className="grid grid-cols-2 gap-6 mb-6">
          <Input
            name="slug"
            control={control}
            display="Đường dẫn hình ảnh"
            placeholder="Nơi lưu ảnh"
          ></Input>
          <Input
            name="name"
            control={control}
            display="Tên dự án"
            placeholder="Nhập vào tên dự án"
          ></Input>
        </div>
        <div>
          <Editor
            name="description"
            control={control}
            display="Nhập mô tả cả dự án"
            placeholder="Mô tả"
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
