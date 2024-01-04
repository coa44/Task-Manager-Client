import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch, useSelector } from "react-redux";
import { applicationSlice } from "../app/slices/applicationSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmationDialog = () => {
  const dispatch = useDispatch();
  const confirmationDialog = useSelector(
    applicationSlice.selectors.confirmationDialog
  );

  const handleClose = () => {
    dispatch(applicationSlice.actions.setConfirmationDialog(null));
  };

  const handleConfirm = () => {
    const cb = confirmationDialog?.cb;
    if (cb) {
      cb();
    }
    dispatch(applicationSlice.actions.setConfirmationDialog(null));
  };

  const title = confirmationDialog?.title ?? "";
  const text = confirmationDialog?.text ?? "";
  const confirmText = confirmationDialog?.confirmText ?? "Delete";
  const cancelText = confirmationDialog?.cancelText ?? "Cancel";
  return (
    <Dialog
      open={confirmationDialog !== null}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          {cancelText}
        </Button>
        <Button variant="contained" onClick={handleConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
