import React from "react";
import BlogForm from "../../components/ui/form/BlogForm";

const Blog = () => {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto pb-12">
        <BlogForm type="update" />
      </div>
    </div>
  );
};

export default Blog;
