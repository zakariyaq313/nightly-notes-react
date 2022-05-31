import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { noteStateSlice } from "./slice/slice";

const store = configureStore({
	reducer: noteStateSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
export const noteActions = noteStateSlice.actions;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
