import React from "react";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../../components/Navbar/Navbar";

const Layout = () => {
  return (
    <LayoutWrapper>
      <Header />
      <Navbar />
      <Outlet />
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export default Layout;
