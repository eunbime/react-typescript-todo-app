import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./modules/todosSlice";
import modalSlice from "./modules/modalSlice";

export const store = configureStore({
  reducer: {
    todosSlice,
    modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
