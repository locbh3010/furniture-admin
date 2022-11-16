import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Editor from "../input/Editor";
import Input from "../input/Input";
import InputFile from "../input/InputFile";

const ProjectForm = ({ type = "add" }) => {
  const { control, handleSubmit, watch } = useForm({
    mode: onchange,
  });
  const watchSlug = watch("slug");

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
        <div className="flex flex-col gap-6">
          <Editor
            name="description"
            control={control}
            display="Nhập mô tả cả dự án"
            placeholder="Mô tả"
          />

          {watchSlug && <InputFile />}
        </div>

        <div className="mt-6 flex-center">
          <button className="btn-primary px-7 py-3">
            {type === "add" ? "Thêm" : "Cập nhật"} dự án
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
