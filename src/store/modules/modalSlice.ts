import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewAddTodoModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleAddTodoModal: (state, { payload }) => {
      state.viewAddTodoModal = payload;
    },
  },
});

export const { toggleAddTodoModal } = modalSlice.actions;
export default modalSlice.reducer;
