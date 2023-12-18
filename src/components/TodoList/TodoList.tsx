import React, { useEffect } from "react";
import TodoItem from "./TodoItem/TodoItem";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Todo } from "../../types/todo";
import { __getTodos } from "../../store/modules/todosSlice";

const TodoList = ({ isSuccess }: { isSuccess: boolean }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const { todos, isLoading, error } = useAppSelector(
    (state) => state.todosSlice
  );

  console.log(error);

  const filteredTodos = todos?.filter(
    (todo: Todo) => todo.isDone === isSuccess
  );

  if (isLoading) return "loading...";

  if (error) return `에러가 발생했습니다`;

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
  margin-top: 1rem;

  h2 {
    font-size: x-large;
    font-weight: 700;
    color: #22a6b3;
    margin-left: 0.5rem;
  }
`;

const ItemsWrapper = styled.ul`
  display: flex;
  gap: 1rem;
`;

export default TodoList;
