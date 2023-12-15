import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { Todo } from "../../types/todo";

interface TodosType {
  todos: Todo[];
  editTitle: string;
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
    {
      id: v4(),
      title: "title2",
      content: "content2",
      isDone: true,
      date: "11/22/3",
      createdAt: 123,
    },
  ],
  editTitle: "",
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
    setTodoTitle: (state, { payload }) => {
      state.editTitle = payload;
    },
    toggleIsDone: (state, { payload }) => {
      const { id } = payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      );
    },
  },
});

export const { addTodo, deleteTodo, editTodo, setTodoTitle, toggleIsDone } =
  todosSlice.actions;
export default todosSlice.reducer;
