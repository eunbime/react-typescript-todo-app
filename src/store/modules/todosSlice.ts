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
    setTodoTitle: (state, { payload }) => {
      state.editTitle = payload;
    },
  },
});

export const { setTodoTitle } = todosSlice.actions;
export default todosSlice.reducer;
