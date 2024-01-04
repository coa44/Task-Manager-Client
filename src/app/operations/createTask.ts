import { StrictEffect, call, put, select } from "redux-saga/effects";
import { DEFAULT_ERROR_MESSAGE } from "../constants";
import * as API from "../api";
import { PayloadAction } from "@reduxjs/toolkit";

import { SnackbarSeverity } from "../types/Snackbar";
import { applicationSlice } from "../slices/applicationSlice";
import { SaveTaskAction, taskSlice } from "../slices/taskSlice";
import { authenticationSlice } from "../slices/authenticationSlice";

export function* createTask(
  action: PayloadAction<SaveTaskAction>
): Generator<StrictEffect, any, any> {
  const { params, cb } = action.payload;
  const authenticationToken = yield select(
    authenticationSlice.selectors.authenticationToken
  );

  const result = yield call(API.createTask, params, authenticationToken);
  const succeeded = result.succeeded;
  /**
   * Check response state
   * If successfull, use callback function to proceed with the navigation to success screen
   * Also set first pagination to first page to ensure that newly created tasks is always visible on the screen after successfull creation
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

  yield put(taskSlice.actions.setPage(1));
  yield put(taskSlice.actions.loadTasks());
  yield put(
    applicationSlice.actions.setSnackbarMessage({
      message: "Task has been successfully created.",
      severity: SnackbarSeverity.SUCCESS,
    })
  );

  cb();
}
