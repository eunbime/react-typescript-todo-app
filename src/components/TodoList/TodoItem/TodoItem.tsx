import React from "react";
import styled from "styled-components";
import { Todo } from "../../../types/todo";
import { useAppDispatch } from "../../../hooks/redux";
import {
  __deleteTodos,
  __toggleIsDone,
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
    const answer = window.confirm("할일을 삭제하시겠습니까?");

    if (!answer) return;

    dispatch(__deleteTodos(id));
  };

  console.log(todo.content);
  const newContent =
    todo.content.length < 20 ? todo.content : todo.content.slice(0, 20) + "...";

  return (
    <>
      <StItem>
        <h3>{todo.title}</h3>
        <p>{parse(newContent)}</p>
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
  border-radius: 0.5rem;
  background-color: #ffbe76;
  padding: 1.65rem;

  p {
    font-size: large;
  }
`;

const ButtonSection = styled.section`
  display: flex;
  gap: 0.5rem;

  button {
    padding: 0.5rem 1rem;
    font-size: medium;
    border-radius: 0.5rem;
    background-color: #c7ecee;
  }
`;
export default TodoItem;
