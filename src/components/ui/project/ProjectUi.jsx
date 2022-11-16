import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteDoc } from "../../../hooks/firesotre-hooks";

export const ProjectList = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-6 grid-flow-row auto-row-fr">
      {children}
    </div>
  );
};

export const ProjectItem = ({ data }) => {
  const navigate = useNavigate();
  const [handleDeleteDoc] = useDeleteDoc();
  const descRef = useRef(null);

  const handleNavigate = () => {
    navigate(`/project/${data.id}`);
  };
  const handleDelete = () => {
    handleDeleteDoc("projects", data.id, data.slug);
  };

  useEffect(() => {
    descRef.current.insertAdjacentHTML("beforeend", data.description);
  }, []);

  return (
    <div className="rounded-lg shadow-md bg-white flex items-center duration-300 hover:shadow-lg group">
      <div className="bg-black aspect-square overflow-hidden rounded-lg basis-[40%] flex-shrink-0 rounded-r-none cursor-pointer">
        <img
          src={data.image}
          alt=""
          className="w-full h-full object-cover rounded-l-lg duration-300 group-hover:scale-125"
        />
      </div>

      <div className="flex-1 h-full px-4 py-3 flex flex-col">
        <p className="text-xl font-bold mb-2 line-clamp-1 cursor-pointer">
          {data.name}
        </p>
        <span
          className="text-gray-400 text-sm font-medium line-clamp-3"
          ref={descRef}
        ></span>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button
            className="rounded-md border-2 border-blue-500 w-full py-1 font-medium text-blue-500 duration-300 hover:bg-blue-500 hover:text-white"
            onClick={handleNavigate}
          >
            Xem chi tiết
          </button>
          <button
            className="rounded-md h-full bg-red-500 text-white font-bold duration-300 hover:bg-red-400"
            onClick={handleDelete}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};
