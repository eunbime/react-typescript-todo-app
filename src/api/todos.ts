import axios from "axios";
import { Todo } from "../types/todo";

const getTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get("http://localhost:4000/todos");
  console.log(data);
  return data;
};

const addTodo = async (newTodo: Todo): Promise<void> => {
  await axios.post("http://localhost:4000/todos", newTodo);
};

const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`http://localhost:4000/todos/${id}`);
};

const toggleIsDoneTodo = async (payload: Todo): Promise<void> => {
  await axios.patch(`http://localhost:4000/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

export { getTodos, addTodo, deleteTodo, toggleIsDoneTodo };
