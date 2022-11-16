import React from "react";

export const ProjectList = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-6 grid-flow-row auto-row-fr">
      {children}
    </div>
  );
};

export const ProjectItem = () => {
  return (
    <div className="rounded-lg shadow-md bg-white flex items-center duration-300 hover:shadow-lg group">
      <div className="bg-black aspect-square overflow-hidden rounded-lg basis-[40%] flex-shrink-0 rounded-r-none cursor-pointer">
        <img
          src="https://i.pinimg.com/236x/00/ab/a0/00aba09defe998861037c4acf841db7c.jpg"
          alt=""
          className="w-full h-full object-cover rounded-l-lg duration-300 group-hover:scale-125"
        />
      </div>

      <div className="flex-1 h-full px-4 py-3 flex flex-col">
        <p className="text-xl font-bold mb-2 line-clamp-1 cursor-pointer">
          Lorem ipsum dolor sit amet.
        </p>
        <span className="text-gray-400 text-sm font-medium line-clamp-3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
          quaerat esse porro voluptatum, dolores dicta quae ipsam saepe ipsum
          iusto libero nam tempora amet error, sed recusandae facere placeat
          reprehenderit.
        </span>

        <div className="mt-auto grid grid-cols-2 gap-3">
          <button className="rounded-md border-2 border-blue-500 w-full py-1 font-medium text-blue-500 duration-300 hover:bg-blue-500 hover:text-white">
            Xem chi tiết
          </button>
          <button className="rounded-md h-full bg-red-500 text-white font-bold duration-300 hover:bg-red-400">
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
};
