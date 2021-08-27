import { combineReducers } from "@reduxjs/toolkit";
import { userSlice, UserState } from "../slices/user";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = {
  user: UserState;
};
