import React from "react";
import styled from "styled-components";
import { Todo } from "../../../types/todo";
import { useAppDispatch } from "../../../hooks/redux";
import parse from "html-react-parser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, toggleIsDoneTodo } from "../../../api/todos";
import { AxiosError } from "axios";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  // Mutations
  const deleteMutation = useMutation<
    void,
    AxiosError<unknown, any>,
    string,
    unknown
  >(deleteTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });

  const isDoneMutation = useMutation<
    unknown,
    AxiosError<unknown, any>,
    void,
    unknown
  >(toggleIsDoneTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });

  const successHandler = (id: string) => {
    isDoneMutation.mutate(id as string);
  };

  return (
    <>
      <StItem>
        <h3>{todo.title}</h3>
        <p>{parse(todo.content)}</p>
        <ButtonSection>
          <button
            onClick={() => {
              mutation.mutate(todo.id);
            }}
          >
            삭제
          </button>
          <button>수정</button>
          <button onClick={() => successHandler(todo.id)}>
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
