import { StrictEffect, call, put, select } from "redux-saga/effects";
import { DEFAULT_ERROR_MESSAGE } from "../constants";

import * as API from "../api";
import { SnackbarSeverity } from "../types/Snackbar";
import { applicationSlice } from "../slices/applicationSlice";
import { taskSlice } from "../slices/taskSlice";
import { Pagination } from "../types/Pagination";

export function* loadTasks(): Generator<StrictEffect, any, any> {
  const pagination: Pagination = yield select(taskSlice.selectors.pagination);
  const { page, pageSize } = pagination;
  const result = yield call(API.getTasks, page, pageSize);
  const succeeded = result.succeeded;

  /**
   * Check response state
   * If successfull, set tasks for the list and update paginations options
   * Otherwise show snackbar errors
   */
  if (succeeded) {
    const { tasks, page, pageSize, total } = result.data;
    yield put(
      taskSlice.actions.setPagination({
        page,
        pageSize,
        total,
      })
    );
    yield put(taskSlice.actions.setTasks(tasks));
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
