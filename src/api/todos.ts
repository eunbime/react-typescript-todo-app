import axios from "axios";
import todosApi from "../axios/todosApi";
import { Todo } from "../types/todo";

const getTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get("http://localhost:4000/todos");
  console.log(data);
  return data;
};

const addTodo = async (newTodo: Todo) => {
  await axios.post("http://localhost:4000/todos", newTodo);
};

const deleteTodo = async (id: string) => {
  await axios.delete(`http://localhost:4000/todos/${id}`);
};

const toggleIsDoneTodo = async (payload: Todo) => {
  await axios.patch(`http://localhost:4000/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

export { getTodos, addTodo, deleteTodo, toggleIsDoneTodo };
