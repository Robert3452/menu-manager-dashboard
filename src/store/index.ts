import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducer";
import { useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NEXT_PUBLIC_ENABLE_REDUX_DEV_TOOLS === "true",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
