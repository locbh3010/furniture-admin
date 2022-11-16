import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase.config";

const menuList = [
  {
    to: "/",
    title: "Trang chủ",
  },
  {
    to: "/projects",
    title: "Quản lý dự án",
  },
  {
    to: "/products",
    title: "Quản lý sản phẩm",
  },
  {
    to: "/blogs",
    title: "Quản lý blog",
  },
];

const Nav = () => {
  const { user } = useAuth();
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div className="py-4 shadow-sm border-b border-gray-300 sticky top-0 left-0 w-full z-50 bg-white">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {menuList.map((menu) => (
              <Link key={menu.to} to={menu.to} className="font-semibold">
                {menu.title}
              </Link>
            ))}
          </div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-bold capitalize">{user?.email}</span>
              <div className="rounded-full w-10 h-10 bg-gray-700"></div>
              <button className="btn-primary" onClick={handleSignOut}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to={"/sign-in"} className="btn-primary">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
