import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { authenticationSlice } from "../app/slices/authenticationSlice";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  backEnabled?: boolean;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { children, title, backEnabled } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticationToken = useSelector(
    authenticationSlice.selectors.authenticationToken
  );

  const isAuthenticated = authenticationToken !== null;

  const handleNavigate = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(authenticationSlice.actions.logout());
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {backEnabled && (
              <IconButton color="inherit" onClick={handleBack}>
                <ArrowBack />
              </IconButton>
            )}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>

            <Button
              color="inherit"
              onClick={isAuthenticated ? handleLogout : handleNavigate}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </div>
  );
};

export default Layout;
