import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { db, storage } from "../../../configs/firebase.config";
import Checkbox from "../input/Checkbox";
import Editor from "../input/Editor";
import Input from "../input/Input";
import InputFile from "../input/InputFile";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAddDoc, useUpdateDoc } from "../../../hooks/firesotre-hooks";
import { useParams } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";

const ProjectForm = ({ type = "add" }) => {
  const { id } = type === "update" && useParams();
  const { control, handleSubmit, watch, getValues, setValue } = useForm({
    mode: onchange,
  });
  const [handleAddDoc] = useAddDoc();
  const [handleUpdateDoc] = useUpdateDoc();
  const watchSlug = watch("slug");

  const [image, setImage] = useState(null);
  const [project, setProject] = useState(null);

  const handleUploadImage = (file) => {
    if (file) {
      const path = getValues("slug");
      const storageRef = ref(storage, `images/${path}/${file.name}`);
      uploadBytes(storageRef, file).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        setValue("image", downloadURL);
        setImage(downloadURL);
      });
    }
  };
  const handleInputChange = (e) => {
    const file = e.target.files[0];

    handleUploadImage(file);
  };
  const handleAddProject = (value) => {
    handleAddDoc("projects", value);
  };
  const handleUpdateProject = (value) => {
    const updateData = {
      path: "projects",
      id,
      data: value,
    };
    handleUpdateDoc(updateData);
  };

  useEffect(() => {
    if (id) {
      const projectRef = doc(collection(db, "projects"), id);

      onSnapshot(projectRef, (res) =>
        setProject({ id: res.id, ...res.data() })
      );
    } else {
      setProject({
        showcase: false,
        feature: false,
      });
    }
  }, [id]);

  useEffect(() => {
    if (project) {
      for (const key in project) {
        setValue(key, project[key]);
      }
    }
  }, [project]);

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
            disabled={type === "update" ? true : false}
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
          <div className="flex items-start flex-col gap-2">
            <Checkbox
              display="Hiển thị ở trang chủ"
              name="feature"
              control={control}
              value={project?.feature}
            />
            <Checkbox
              display="Hiển thị ở trang thi công nội thất"
              name="showcase"
              control={control}
              value={project?.showcase}
            />
          </div>
          {watchSlug && <InputFile onChange={handleInputChange} />}
        </div>

        <div className="mt-6 flex-center">
          <button className="btn-primary px-7 py-3">
            {type === "add" ? "Thêm" : "Cập nhật"} dự án
          </button>
        </div>
      </form>

      {image && (
        <div className="aspect-video rounded-lg overflow-hidden max-w-xl mt-10 mx-auto">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default ProjectForm;
