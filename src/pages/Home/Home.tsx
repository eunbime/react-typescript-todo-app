import React from "react";
import { Container } from "../../styles/styles";
import TodoList from "../../components/TodoList/TodoList";
import styled from "styled-components";
import AddForm from "../../components/AddForm/AddForm";
import AddTodoModal from "../../components/Modal/AddTodoModal/AddTodoModal";

const Home = () => {
  return (
    <Container>
      <AddForm />
      <ListWrapper>
        <TodoList isSuccess={false} />
        <TodoList isSuccess={true} />
      </ListWrapper>
      <AddTodoModal />
    </Container>
  );
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default Home;
