import { StrictEffect, call, put, select } from "redux-saga/effects";
import { DEFAULT_ERROR_MESSAGE } from "../constants";

import * as API from "../api";
import { SnackbarSeverity } from "../types/Snackbar";
import { applicationSlice } from "../slices/applicationSlice";
import { taskSlice } from "../slices/taskSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { authenticationSlice } from "../slices/authenticationSlice";

export function* deleteTask(
  action: PayloadAction<number>
): Generator<StrictEffect, any, any> {
  const id = action.payload;

  const authenticationToken = yield select(
    authenticationSlice.selectors.authenticationToken
  );
  const result = yield call(API.deleteTask, id, authenticationToken);
  const succeeded = result.succeeded;

  /**
   * Check response state
   * If successfull, show success message and reload tasks
   * Otherwise show snackbar errors
   */
  if (succeeded) {
    yield put(taskSlice.actions.loadTasks());
    yield put(
      applicationSlice.actions.setSnackbarMessage({
        message: "Task has been successfully deleted.",
        severity: SnackbarSeverity.SUCCESS,
      })
    );
  } else {
    const message = result.data.message ?? DEFAULT_ERROR_MESSAGE;
    yield put(
      applicationSlice.actions.setSnackbarMessage({
        message,
        severity: SnackbarSeverity.ERROR,
      })
    );
  }
}
