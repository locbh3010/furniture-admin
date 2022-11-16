import React from "react";

export const BlogList = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-4 grid-flow-row auto-rows-auto">
      {children}
    </div>
  );
};

export const BlogItem = () => {
  return (
    <div className="rounded-lg shadow-white/25 bg-white flex flex-col shadow-lg">
      <div className="aspect-[16/10] flex-shrink-0 overflow-hidden rounded-t-lg">
        <img
          src="https://assets.pokemon.com//assets/cms2/img/misc/virtual-backgrounds/sword-shield/pokemon-in-the-wild.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col gap-8">
        <div>
          <p className="font-bold text-slate-900 text-3xl line-clamp-1 mb-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            deserunt quia libero eos illum quas quisquam aliquid soluta minus
            iste!
          </p>
          <p className="line-clamp-4 text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
            id vitae, amet laudantium recusandae eius officia quaerat neque
            dignissimos tempore!
          </p>
        </div>
        <div className="mt-auto grid grid-cols-2 items-center gap-2">
          <button className="block px-4 h-12 bg-blue-600 duration-300 hover:bg-blue-500 rounded-lg font-medium text-white">
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
