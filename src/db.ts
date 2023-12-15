import { v4 } from "uuid";

interface Todo {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
  date: string;
  createdAt: number;
}

interface DB {
  todos: Todo[];
}

export const db: DB = {
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
};
