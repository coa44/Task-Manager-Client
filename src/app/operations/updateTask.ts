import { StrictEffect, call, put, select } from "redux-saga/effects";
import { DEFAULT_ERROR_MESSAGE } from "../constants";
import * as API from "../api";
import { PayloadAction } from "@reduxjs/toolkit";

import { SnackbarSeverity } from "../types/Snackbar";
import { applicationSlice } from "../slices/applicationSlice";
import { SaveTaskAction, taskSlice } from "../slices/taskSlice";
import { authenticationSlice } from "../slices/authenticationSlice";

export function* updateTask(
  action: PayloadAction<SaveTaskAction>
): Generator<StrictEffect, any, any> {
  const { params, cb } = action.payload;
  const authenticationToken = yield select(
    authenticationSlice.selectors.authenticationToken
  );
  const editTask = yield select(taskSlice.selectors.editTask);
  const id = editTask.id;

  const result = yield call(API.updateTask, params, id, authenticationToken);
  const succeeded = result.succeeded;
  /**
   * Check response state
   * If successfull, proceed with the navigation to success screen
   * If successfull, reset edit task state
   * Otherwise show snackbar errors
   */
  if (!succeeded) {
    const message = result.data.message ?? DEFAULT_ERROR_MESSAGE;
    yield put(
      applicationSlice.actions.setSnackbarMessage({
        message,
        severity: SnackbarSeverity.ERROR,
      })
    );
    return;
  }

  yield put(taskSlice.actions.loadTasks());
  yield put(
    applicationSlice.actions.setSnackbarMessage({
      message: "Task has been successfully updated.",
      severity: SnackbarSeverity.SUCCESS,
    })
  );

  cb();
  yield put(taskSlice.actions.setEditTask(null));
}
