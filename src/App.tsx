import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";

import MainScreen from "./screens/MainScreen";
import { persistor, store } from "./app/store";
import theme from "./app/theme";
import SnackbarMessage from "./components/SnackbarMessage";
import ConfirmationDialog from "./components/ConfirmationDialog";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainScreen />
          <SnackbarMessage />
          <ConfirmationDialog />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
