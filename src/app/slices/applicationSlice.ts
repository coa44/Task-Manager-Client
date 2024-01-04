import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { APPLICATION_SLICE } from "../constants";
import { SnackbarMessageParams } from "../types/Snackbar";
import { ConfirmationDialog } from "../types/Components";
import { State } from "../store";

export type ApplicationState = {
  snackbarMessage: SnackbarMessageParams | null;
  confirmationDialog: ConfirmationDialog | null;
};

const initialState: ApplicationState = {
  snackbarMessage: null,
  confirmationDialog: null,
};

interface AdditionalSliceFeatures {
  selectors: {
    snackbarMessage(state: State): SnackbarMessageParams | null;
    confirmationDialog(state: State): ConfirmationDialog | null;
  };
}

const _slice = createSlice({
  name: APPLICATION_SLICE.APPLICATION,
  initialState,
  reducers: {
    setSnackbarMessage(
      state: ApplicationState,
      action: PayloadAction<SnackbarMessageParams | null>
    ) {
      state.snackbarMessage = action.payload;
    },
    setConfirmationDialog(
      state: ApplicationState,
      action: PayloadAction<ConfirmationDialog | null>
    ) {
      state.confirmationDialog = action.payload;
    },
  },
});

export const applicationSlice: typeof _slice & AdditionalSliceFeatures =
  _slice as any;

applicationSlice.selectors = {
  snackbarMessage: (state: State): SnackbarMessageParams | null => {
    return state.application.snackbarMessage;
  },
  confirmationDialog: (state: State): ConfirmationDialog | null => {
    return state.application.confirmationDialog;
  },
};
