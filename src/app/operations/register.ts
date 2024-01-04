import { StrictEffect, call, put } from "redux-saga/effects";
import { DEFAULT_ERROR_MESSAGE } from "../constants";
import * as API from "../api";
import { PayloadAction } from "@reduxjs/toolkit";

import { SnackbarSeverity } from "../types/Snackbar";
import { applicationSlice } from "../slices/applicationSlice";
import { RegisterAction } from "../slices/authenticationSlice";

export function* register(
  action: PayloadAction<RegisterAction>
): Generator<StrictEffect, any, any> {
  const { params, cb } = action.payload;

  const result = yield call(API.register, params);
  const succeeded = result.succeeded;

  /**
   * Check response state
   * If successfull, use callback function to proceed with the navigation to success screen
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
  cb();
}
