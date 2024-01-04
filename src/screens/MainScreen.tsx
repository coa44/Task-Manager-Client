import { useDispatch, useSelector } from "react-redux";
import { authenticationSlice } from "../app/slices/authenticationSlice";
import { Private, Public } from "../app/Routes";
import { applicationSlice } from "../app/slices/applicationSlice";
import { SnackbarSeverity } from "../app/types/Snackbar";

const MainScreen = () => {
  const dispatch = useDispatch();

  const authenticationToken = useSelector(
    authenticationSlice.selectors.authenticationToken
  );
  const introMessageShown = useSelector(
    authenticationSlice.selectors.introMessageShown
  );

  /**
   * Showing an intro guide message first time when the app is opened
   */
  if (!introMessageShown) {
    setTimeout(() => {
      dispatch(
        applicationSlice.actions.setSnackbarMessage({
          message:
            "Hello there! Welcome to the task manager application. Please register to enable more features.",
          severity: SnackbarSeverity.INFO,
          autoHideDuration: 10000,
        })
      );
      dispatch(authenticationSlice.actions.setIntroMessageShown(true));
    }, 3000);
  }

  const isAuthenticated = authenticationToken !== null;
  return isAuthenticated ? <Private /> : <Public />;
};

export default MainScreen;
