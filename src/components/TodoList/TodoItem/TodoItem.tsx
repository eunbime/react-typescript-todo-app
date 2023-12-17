import React from "react";
import styled from "styled-components";
import { Todo } from "../../../types/todo";
import { useAppDispatch } from "../../../hooks/redux";
import {
  __deleteTodos,
  __toggleIsDone,
  deleteTodo,
} from "../../../store/modules/todosSlice";
import parse from "html-react-parser";

interface TodoType {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoType) => {
  const dispatch = useAppDispatch();

  const successHandler = (id: string, isDone: boolean) => {
    let newIsDone = !isDone;
    dispatch(__toggleIsDone({ id, newIsDone }));
  };

  const deleteHandler = (id: string) => {
    dispatch(__deleteTodos(id));
  };

  return (
    <>
      <StItem>
        <h3>{todo.title}</h3>
        <p>{parse(todo.content)}</p>
        <ButtonSection>
          <button onClick={() => deleteHandler(todo.id as string)}>삭제</button>
          <button
            onClick={() => successHandler(todo.id as string, todo.isDone)}
          >
            {todo.isDone ? "취소" : "완료"}
          </button>
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
