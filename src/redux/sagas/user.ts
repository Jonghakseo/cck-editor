import { all, takeLatest, call } from "redux-saga/effects";
import { userSlice } from "../slices/user";
import { getSession } from "../../apis/account";

export function* requestLogin() {
  try {
    yield call(getSession);
  } catch (e) {
    console.error(e);
  }
}

export default function* root() {
  yield all([takeLatest(userSlice.actions.login, requestLogin)]);
}
