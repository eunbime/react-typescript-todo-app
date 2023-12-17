import React, { useEffect } from "react";
import TodoItem from "./TodoItem/TodoItem";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useQuery } from "react-query";
import { getTodos } from "../../api/todos";
import { Todo } from "../../types/todo";
import { __getTodos } from "../../store/modules/todosSlice";

const TodoList = ({ isSuccess }: { isSuccess: boolean }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const { todos } = useAppSelector((state) => state.todosSlice);

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
