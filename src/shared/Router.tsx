import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Detail from "../pages/Detail/Detail";
import Layout from "./layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
