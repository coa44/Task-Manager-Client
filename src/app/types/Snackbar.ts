export enum SnackbarSeverity {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

export interface SnackbarMessageParams {
  message: string;
  severity: SnackbarSeverity;
  autoHideDuration?: number;
}
