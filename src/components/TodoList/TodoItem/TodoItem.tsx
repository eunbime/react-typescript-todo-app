import React from "react";
import styled from "styled-components";
import { Todo } from "../../../types/todo";
import { useAppDispatch } from "../../../hooks/redux";
import { deleteTodo } from "../../../store/modules/todosSlice";
import parse from "html-react-parser";

interface TodoType {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoType) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <StItem>
        <h3>{todo.title}</h3>
        <p>{parse(todo.content)}</p>
        <ButtonSection>
          <button onClick={() => dispatch(deleteTodo(todo.id))}>삭제</button>
          <button>수정</button>
          <button>완료</button>
        </ButtonSection>
      </StItem>
    </>
  );
};

const StItem = styled.li`
  display: flex;
  flex-direction: column;
  font-size: x-large;
  font-weight: 500;
  gap: 0.65rem;
  border: 1px solid #222;
  padding: 1.65rem;

  p {
    font-size: large;
  }
`;

const ButtonSection = styled.section`
  display: flex;
  gap: 0.5rem;
`;
export default TodoItem;
