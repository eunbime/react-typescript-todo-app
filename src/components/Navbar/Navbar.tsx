import React from "react";
import { Container } from "../../styles/styles";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Container>
      <Categories>
        <li>all</li>
        <li>study</li>
        <li>hobby</li>
      </Categories>
    </Container>
  );
};

const Categories = styled.ul`
  display: flex;
  gap: 3rem;
  font-size: large;
  font-weight: 600;
  justify-content: center;
  align-items: center;
`;

export default Navbar;
