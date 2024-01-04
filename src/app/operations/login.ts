import { StrictEffect, call, put } from "redux-saga/effects";
import { DEFAULT_ERROR_MESSAGE } from "../constants";

import * as API from "../api";
import { SnackbarSeverity } from "../types/Snackbar";
import { applicationSlice } from "../slices/applicationSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  LoginAction,
  authenticationSlice,
} from "../slices/authenticationSlice";

export function* login(
  action: PayloadAction<LoginAction>
): Generator<StrictEffect, any, any> {
  const { params } = action.payload;

  const result = yield call(API.login, params);
  const succeeded = result.succeeded;

  /**
   * Check response state
   * If successfull, set the access token for later
   * Otherwise show snackbar errors
   */
  if (succeeded) {
    const authenticatedToken = result.data.token;
    yield put(
      authenticationSlice.actions.setAuthenticationToken(authenticatedToken)
    );
    yield put(
      applicationSlice.actions.setSnackbarMessage({
        message: "Login succesfull.",
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
