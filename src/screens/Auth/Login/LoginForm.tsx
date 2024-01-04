import React, { FC, useCallback } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
} from "@mui/material";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { LoginParams } from "../../../app/types/Authentication";

interface LoginFormProps {
  handleSubmit: (params: LoginParams) => void;
}

const LoginForm: FC<LoginFormProps> = (props) => {
  const { handleSubmit } = props;

  const initialValues: LoginParams = {
    username: "",
    password: "",
  };

  const onSubmit = useCallback(
    (values: LoginParams, helpers: FormikHelpers<LoginParams>) => {
      setTimeout(() => {
        handleSubmit(values);
        helpers.setSubmitting(false);
      }, 1000); // Added for visual effect
    },
    [handleSubmit]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, isSubmitting }) => {
              return (
                <Form>
                  <Field
                    as={TextField}
                    type="text"
                    label="Username"
                    name="username"
                    margin="dense"
                    fullWidth
                    placeholder="Username"
                  />
                  <Field
                    as={TextField}
                    type="text"
                    label="Password"
                    name="password"
                    margin="dense"
                    fullWidth
                    placeholder="Password"
                  />

                  <Button
                    disabled={
                      values.password === "" ||
                      values.username === "" ||
                      isSubmitting
                    }
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="primary" />
                    ) : (
                      <Typography>Sign In</Typography>
                    )}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 8, mb: 4 }}
      >
        <Link color="inherit" href="/register">
          Don`t have an account yet? Sign Up
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginForm;
