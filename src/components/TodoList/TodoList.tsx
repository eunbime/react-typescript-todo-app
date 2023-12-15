import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/redux";
import { useQuery } from "react-query";
import { getTodos } from "../../api/todos";
import { Todo } from "../../types/todo";

const TodoList = ({ isSuccess }: { isSuccess: boolean }) => {
  const { todos } = useAppSelector((state) => state.todosSlice);
  // const { isLoading, isError, data: todos } = useQuery(["todos"], getTodos);

  const filteredTodos = todos?.filter(
    (todo: Todo) => todo.isDone === isSuccess
  );

  return (
    <div>
      <ListSection>
        {isSuccess ? <h2>success</h2> : <h2>todo</h2>}
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
