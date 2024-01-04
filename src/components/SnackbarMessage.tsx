import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { SnackbarSeverity } from "../app/types/Snackbar";
import { applicationSlice } from "../app/slices/applicationSlice";
import { SNACKBAR_TIMEOUT } from "../app/constants";

const SnackbarMessage: FC = () => {
  const dispatch = useDispatch();
  const snackbarMessage = useSelector(
    applicationSlice.selectors.snackbarMessage
  );

  const open = snackbarMessage !== null;

  const message = snackbarMessage?.message || "";
  const severity = snackbarMessage?.severity || SnackbarSeverity.SUCCESS;
  const autoHideDuration =
    snackbarMessage?.autoHideDuration || SNACKBAR_TIMEOUT;

  const handleClose = () => {
    dispatch(applicationSlice.actions.setSnackbarMessage(null));
  };

  return (
    snackbarMessage && (
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    )
  );
};

export default SnackbarMessage;
