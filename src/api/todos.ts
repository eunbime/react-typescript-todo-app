import axios from "axios";

const getTodos = async () => {
  const { data } = await axios.get("http://localhost:4000/todos");
  console.log(data);
  return data;
};

export { getTodos };
