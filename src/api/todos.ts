import axios from "axios";
import todosApi from "../axios/todosApi";

const getTodos = async () => {
  const { data } = await axios.get("http://localhost:4000/todos");
  console.log(data);
  return data;
};

export { getTodos };
