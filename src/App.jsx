import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useAuth } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Project from "./pages/project/Project";
import Projects from "./pages/projects/Projects";
import SignIn from "./pages/signIn/SignIn";

const App = () => {
  const { user } = useAuth();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/project/:id" element={<Project />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route
            path="/sign-in"
            element={<>{user ? <Navigate to="/" /> : <SignIn />}</>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
