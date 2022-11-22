import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../configs/firebase.config";
import { useDeleteDoc } from "../../../hooks/firesotre-hooks";

export const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const blogRef = collection(db, "blogs");

  useEffect(() => {
    onSnapshot(blogRef, (res) => {
      const docs = res.docs;
      let temp = [];

      docs?.length > 0 &&
        docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setBlogs(temp);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 grid-flow-row auto-rows-auto pb-12">
      {blogs?.length > 0 &&
        blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)}
    </div>
  );
};

export const BlogItem = ({ blog }) => {
  const descriptionRef = useRef(null);
  const navigate = useNavigate();
  const [handleDelete] = useDeleteDoc();

  useEffect(() => {
    descriptionRef.current.textContent = "";
    descriptionRef.current.insertAdjacentHTML("beforeend", blog.content);
  }, [blog]);
  const handleNavigate = () => {
    navigate(`/blog/${blog.id}`);
  };
  const handleDeleteBlog = () => {
    handleDelete("blogs", blog.id, blog.slug);
  };
  return (
    <div className="rounded-lg shadow-white/25 bg-white flex flex-col shadow-lg">
      <div
        className="aspect-[16/10] flex-shrink-0 overflow-hidden rounded-t-lg"
        onClick={handleNavigate}
      >
        <img src={blog.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 p-4 flex flex-col gap-8">
        <div>
          <p
            className="font-bold text-slate-900 text-3xl line-clamp-1 mb-2"
            onClick={handleNavigate}
          >
            {blog.name}
          </p>
          <p className="line-clamp-4 text-gray-400" ref={descriptionRef}></p>
        </div>
        <div className="mt-auto grid grid-cols-2 items-center gap-2">
          <button
            className="block px-4 h-12 bg-blue-600 duration-300 hover:bg-blue-500 rounded-lg font-medium text-white"
            onClick={handleNavigate}
          >
            Xem chi tiết
          </button>
          <button
            className="rounded-md h-full bg-red-500 text-white font-bold duration-300 hover:bg-red-400"
            onClick={handleDeleteBlog}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};
