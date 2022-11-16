import React from "react";

export const ProductList = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-8 grid-flow-row auto-rows-auto">
      {children}
    </div>
  );
};

export const ProductItem = () => {
  return (
    <div className="w-full h-auto group gap-4">
      <div className="w-full aspect-video overflow-hidden flex-shrink-0 flex mb-4">
        <img
          src="https://i.pinimg.com/736x/61/38/7b/61387bc83dcb60df0f34eb93362bd97a.jpg"
          alt=""
          className="basis-full flex-shrink-0 h-full object-cover duration-300 group-hover:-translate-x-full"
        />
        <img
          src="https://i.pinimg.com/736x/4b/49/d8/4b49d8876399a126191cb0453c662caf.jpg"
          alt=""
          className="basis-full flex-shrink-0 h-full object-cover duration-300 group-hover:-translate-x-full"
        />
      </div>
      <div className="px-4 flex flex-col gap-10 flex-1">
        <div>
          <p className="line-clamp-2 text-2xl mb-3 text-ellipsis font-bold"></p>
          <div className="flex flex-col gap-1">
            <p className="font-normal py-0.5 capitalize text-lg text-ellipsis line-clamp-1">
              <span className="font-bold">Dự án: </span>
            </p>
            <p className="font-normal py-0.5 capitalize text-lg">
              <span className="font-bold">Designer: </span>
            </p>
            <p className="font-normal py-0.5 capitalize text-lg">
              <span className="font-bold">Khách hàng: </span>
            </p>
            <p className="font-normal py-0.5 capitalize text-lg">
              <span className="font-bold">Diện tích: </span>
            </p>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 items-center gap-4 -mx-4">
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
