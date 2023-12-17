import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { Todo } from "../../types/todo";
import axios from "axios";

interface TodosType {
  todos: Todo[];
  editTitle: string;
  isLoading: boolean;
  error: unknown;
}

const initialState: TodosType = {
  todos: [
    // {
    //   id: v4(),
    //   title: "title1",
    //   content: "content1",
    //   isDone: false,
    //   date: "11/22/3",
    //   createdAt: 123,
    // },
    // {
    //   id: v4(),
    //   title: "title2",
    //   content: "content2",
    //   isDone: true,
    //   date: "11/22/3",
    //   createdAt: 123,
    // },
  ] as Todo[],
  editTitle: "",
  isLoading: true,
  error: null,
};

const getTodosFromDB = async () => {
  const { data } = await axios.get<Todo[]>(
    `${process.env.REACT_APP_SERVER_URL}/todos`
  );
  return data;
};

export const __getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, thunkAPI) => {
    try {
      const todos = await getTodosFromDB();
      return todos;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __addTodos = createAsyncThunk(
  "todos/addTodos",
  async (newTodo: Todo, thunkAPI) => {
    try {
      await axios.post<Todo>(
        `${process.env.REACT_APP_SERVER_URL}/todos`,
        newTodo
      );
      const todos = await getTodosFromDB();
      return thunkAPI.fulfillWithValue(todos);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async (id: string, thunkAPI) => {
    try {
      await axios.delete<Todo>(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`
      );
      const todos = await getTodosFromDB();
      return thunkAPI.fulfillWithValue(todos);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __editTodos = createAsyncThunk(
  "toods/editTodos",
  async ({ id, content }: { id: string; content: string }, thunkAPI) => {
    try {
      await axios.patch<Todo>(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`,
        { content: content }
      );
      const todos = await getTodosFromDB();
      return thunkAPI.fulfillWithValue(todos);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const __toggleIsDone = createAsyncThunk(
  "todos/toggleIsDone",
  async ({ id, newIsDone }: { id: string; newIsDone: boolean }, thunkAPI) => {
    try {
      await axios.patch<Todo>(
        `${process.env.REACT_APP_SERVER_URL}/todos/${id}`,
        { isDone: newIsDone }
      );
      const todos = await getTodosFromDB();
      return thunkAPI.fulfillWithValue(todos);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(__getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(__getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(__addTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__addTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(__addTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(__deleteTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__deleteTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(__deleteTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(__editTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__editTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(__editTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(__toggleIsDone.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(__toggleIsDone.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(__toggleIsDone.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addTodo, deleteTodo, editTodo, setTodoTitle, toggleIsDone } =
  todosSlice.actions;
export default todosSlice.reducer;
