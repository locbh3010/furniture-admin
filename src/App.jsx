import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Projects from "./pages/projects/Projects";
import SignIn from "./pages/signIn/SignIn";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/sign-in" element={<SignIn />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
