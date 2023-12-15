import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { Todo } from "../../types/todo";

interface TodosType {
  todos: Todo[];
}

const initialState: TodosType = {
  todos: [
    {
      id: v4(),
      title: "title1",
      content: "content1",
      isDone: false,
      date: "11/22/3",
      createdAt: 123,
    },
  ],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {
      state.todos = [payload, ...state.todos];
    },
    deleteTodo: (state, { payload }) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload);
    },
    editTodo: (state, { payload }) => {
      const { id, content } = payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, content: content } : todo
      );
    },
  },
});

export const { addTodo, deleteTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
