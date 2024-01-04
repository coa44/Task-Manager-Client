export interface ConfirmationDialog {
  cb: () => void;
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
}
