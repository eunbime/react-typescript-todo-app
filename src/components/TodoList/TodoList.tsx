import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/redux";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../api/todos";
import { Todo } from "../../types/todo";
import { AxiosError } from "axios";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

const TodoList = ({ isSuccess }: { isSuccess: boolean }) => {
  const {
    isLoading,
    error,
    data: todos,
  } = useQuery<Todo[], AxiosError<unknown, any>, Todo[], string[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
    retry: 5,
  });

  const filteredTodos = todos?.filter(
    (todo: Todo) => todo.isDone === isSuccess
  );

  console.log(todos);

  if (isLoading) return "Loading...";

  if (error) return "에러 발생: " + error.message;

  return (
    <div>
      <ListSection>
        {isSuccess ? <h2>완료</h2> : <h2>할 일</h2>}
        <ItemsWrapper>
          {filteredTodos?.map((todo: Todo) => (
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
