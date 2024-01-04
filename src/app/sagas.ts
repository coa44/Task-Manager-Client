import { takeLatest } from "redux-saga/effects";
import { authenticationSlice } from "./slices/authenticationSlice";
import { login } from "./operations/login";
import { taskSlice } from "./slices/taskSlice";
import { loadTasks } from "./operations/loadTasks";
import { loadTask } from "./operations/loadTask";
import { deleteTask } from "./operations/deleteTask";
import { register } from "./operations/register";
import { logout } from "./operations/logout";
import { createTask } from "./operations/createTask";
import { updateTask } from "./operations/updateTask";

export default function* appSagas() {
  yield takeLatest(authenticationSlice.actions.register.type, register);
  yield takeLatest(authenticationSlice.actions.login.type, login);
  yield takeLatest(authenticationSlice.actions.logout.type, logout);
  yield takeLatest(taskSlice.actions.loadTasks.type, loadTasks);
  yield takeLatest(taskSlice.actions.loadTask.type, loadTask);
  yield takeLatest(taskSlice.actions.createTask.type, createTask);
  yield takeLatest(taskSlice.actions.updateTask.type, updateTask);
  yield takeLatest(taskSlice.actions.deleteTask.type, deleteTask);
}
