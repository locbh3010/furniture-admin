import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useAuth } from "./contexts/AuthContext";
import Blog from "./pages/blog/Blog";
import Blogs from "./pages/blog/Blogs";

const Home = lazy(() => import("./pages/home/Home"));
const Product = lazy(() => import("./pages/product/Product"));
const Products = lazy(() => import("./pages/products/Products"));
const Project = lazy(() => import("./pages/project/Project"));
const Projects = lazy(() => import("./pages/projects/Projects"));
const SignIn = lazy(() => import("./pages/signIn/SignIn"));

const App = () => {
  const { user } = useAuth();
  return (
    <div>
      <Suspense>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/project/:id" element={<Project />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/product/:id" element={<Product />}></Route>
            <Route
              path="/sign-in"
              element={<>{user ? <Navigate to="/" /> : <SignIn />}</>}
            ></Route>
            <Route path="/blogs" element={<Blogs />}></Route>
            <Route path="/blog/:id" element={<Blog />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
