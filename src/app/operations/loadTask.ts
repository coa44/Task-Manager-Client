import { StrictEffect, call, put } from "redux-saga/effects";
import { DEFAULT_ERROR_MESSAGE } from "../constants";

import * as API from "../api";
import { SnackbarSeverity } from "../types/Snackbar";
import { applicationSlice } from "../slices/applicationSlice";
import { taskSlice } from "../slices/taskSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export function* loadTask(
  action: PayloadAction<number>
): Generator<StrictEffect, any, any> {
  const id = action.payload;

  const result = yield call(API.getTask, id);
  const succeeded = result.succeeded;
  /**
   * Check response state
   * If successfull, set task for editing
   * Otherwise show snackbar errors
   */

  if (succeeded) {
    const task = result.data.task;
    yield put(taskSlice.actions.setEditTask(task));
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
