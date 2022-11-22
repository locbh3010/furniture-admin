import { collection, doc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { db, storage } from "../../../configs/firebase.config";
import { useAddDoc, useUpdateDoc } from "../../../hooks/firesotre-hooks";
import Editor from "../input/Editor";
import Input from "../input/Input";
const removeToneVietnamese = (str) => {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  str = str.replace(/\u02C6|\u0306|\u031B/g, "");
  return str;
};
const BlogForm = ({ type = "add" }) => {
  const { id } = type === "update" && useParams();
  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    mode: onchange,
  });
  const watchName = watch("name");
  const watchSlug = watch("slug");
  const [image, setImage] = useState(null);
  const [handleAdd] = useAddDoc();
  const [handleUpdate] = useUpdateDoc();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const removeTone = watchName && removeToneVietnamese(watchName);
    setValue("slug", removeTone);
  }, [watchName]);
  useEffect(() => {
    if (id) {
      const blogRef = doc(collection(db, "blogs"), id);
      onSnapshot(blogRef, (res) => {
        setBlog({ id: res.id, ...res.data() });
      });
    }
  }, [id]);
  useEffect(() => {
    if (blog) {
      for (const key in blog) {
        setValue(key, blog[key]);
      }
      setImage(blog.image);
    }
  }, [blog]);

  const handleAddBlog = (value) => {
    handleAdd("blogs", value);
  };
  const handleUpdateBlog = (value) => {
    const data = {
      path: "blogs",
      id,
      data: value,
    };
    handleUpdate(data);
  };
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
  return (
    <div>
      <form
        onSubmit={handleSubmit(
          type === "add" ? handleAddBlog : type === "update" && handleUpdateBlog
        )}
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input
            name="name"
            control={control}
            display="Nhập tên blog"
            placeholder="Nhập tên blog"
          />
          <Input
            name="slug"
            control={control}
            display="Nhập đường dẫn blog"
            placeholder="Nhập đường dẫn blog"
            disabled={true}
          />
        </div>
        {watchSlug && (
          <>
            <label
              htmlFor="image"
              className="rounded-lg overflow-hidden bg-gray-400/80 w-full aspect-[5/2] block cursor-pointer flex-center"
            >
              {image && (
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
              {!image && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-28 h-28 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              )}
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              onChange={handleInputChange}
            />
          </>
        )}
        <div className="my-4">
          <Editor
            control={control}
            name="content"
            display="Nhập content blog"
          />
        </div>
        <div className="w-full flex-center">
          <button
            type="submit"
            className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded h-[60px]"
          >
            {type === "add" ? "Thêm" : "Cập nhật"} blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
