import { StrictEffect, put } from "redux-saga/effects";

import { SnackbarSeverity } from "../types/Snackbar";
import { applicationSlice } from "../slices/applicationSlice";
import { authenticationSlice } from "../slices/authenticationSlice";

export function* logout(): Generator<StrictEffect, any, any> {
  yield put(authenticationSlice.actions.setAuthenticationToken(null));
  yield put(
    applicationSlice.actions.setSnackbarMessage({
      message: "Logout succesfull.",
      severity: SnackbarSeverity.SUCCESS,
    })
  );
}
