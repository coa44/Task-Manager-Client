import { createTheme } from "@mui/material";
import { green, yellow } from "@mui/material/colors";

export default createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
      light: "#5977b3",
      dark: "#232e45",
      contrastText: "#fff",
    },
    secondary: {
      main: "#a6a4a4",
      light: "#FAFAFA",
      dark: "#454444",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#ff7961",
      dark: "#ba000d",
      contrastText: "#fff",
    },
    success: {
      main: green[500],
      light: green[300],
      dark: green[700],
      contrastText: "#fff",
    },
    info: {
      main: yellow[500],
      light: yellow[300],
      dark: yellow[700],
      contrastText: "#fff",
    },
  },
});
