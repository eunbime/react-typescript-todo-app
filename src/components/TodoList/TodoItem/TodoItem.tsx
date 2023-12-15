import React from "react";
import styled from "styled-components";
import { Todo } from "../../../types/todo";
import { useAppDispatch } from "../../../hooks/redux";
import { toggleIsDone } from "../../../store/modules/todosSlice";
import parse from "html-react-parser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../../../api/todos";

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation<void, unknown, string, unknown>(deleteTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const dispatch = useAppDispatch();

  const successHandler = (id: string) => {
    dispatch(toggleIsDone({ id }));
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
