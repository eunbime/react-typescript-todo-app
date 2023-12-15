import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/redux";

const TodoList = () => {
  const { todos } = useAppSelector((state) => state.todosSlice);

  return (
    <div>
      <ListSection>
        <h2>todolist</h2>
        <ItemsWrapper>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ItemsWrapper>
      </ListSection>
    </div>
  );
};

const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: large;

  h2 {
    font-size: x-large;
    font-weight: 700;
  }
`;

const ItemsWrapper = styled.ul`
  display: flex;
  gap: 1rem;
`;

export default TodoList;
