import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { noteStateSlice } from "./state-slice/state-slice";

const store = configureStore({
	reducer: noteStateSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
export const noteActions = noteStateSlice.actions;
export type ThunkDispatch = typeof store.dispatch;
export const useThunkDispatch = () => useDispatch<ThunkDispatch>()

export default store;
