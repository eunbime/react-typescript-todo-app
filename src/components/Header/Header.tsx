import React from "react";
import { Container } from "../../styles/styles";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <HeaderTitle>TODOLIST</HeaderTitle>
    </Container>
  );
};

const HeaderTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export default Header;
