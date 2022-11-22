import React from "react";
import { BlogList } from "../../components/ui/blog/BlogUi";
import BlogForm from "../../components/ui/form/BlogForm";

const Blogs = ({ type = "add" }) => {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl mt-6 mb-4 font-bold capitalize">
          Quản lý blog
        </h1>
        <BlogForm type="add" />
      </div>
      <div className="mt-12 container">
        <BlogList />
      </div>
    </>
  );
};

export default Blogs;
