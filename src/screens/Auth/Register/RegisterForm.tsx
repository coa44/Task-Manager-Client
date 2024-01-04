import React, { FC, useCallback } from "react";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import AccountCircle from "@mui/icons-material/AccountCircle";
import * as yup from "yup";
import { RegisterParams } from "../../../app/types/Authentication";

interface LoginFormProps {
  handleSubmit: (params: RegisterParams) => void;
}

interface RegisterFormValues extends RegisterParams {
  passwordRepeat: string;
}

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must contain at least 2 characters")
    .max(25, "First name cannot contain more than 25 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must contain at least 2 characters")
    .max(25, "Last name cannot contain more than 25 characters"),
  username: yup
    .string()
    .required("Username is required")
    .min(2, "Username must contain at least 2 characters")
    .max(25, "Username cannot contain more than 25 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters")
    .max(25, "Password cannot contain more than 25 characters"),
  passwordRepeat: yup
    .string()
    .required("Repeat Password is required")
    .min(6, "Repeat Password must contain at least 6 characters")
    .max(25, "Repeat Password cannot contain more than 25 characters")
    .oneOf([yup.ref("password"), ""], "Passwords do not match"),
});

const RegisterForm: FC<LoginFormProps> = (props) => {
  const { handleSubmit } = props;

  const initialValues: RegisterFormValues = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordRepeat: "",
  };

  const onSubmit = useCallback(
    (
      values: RegisterFormValues,
      helpers: FormikHelpers<RegisterFormValues>
    ) => {
      const registerParams: RegisterParams = {
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        username: values.username,
      };

      setTimeout(() => {
        handleSubmit(registerParams);
        helpers.setSubmitting(false);
      }, 500); // Added for visual effect
    },
    [handleSubmit]
  );

  return (
    <Container component="main" maxWidth="sm">
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
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, errors }) => {
              console.log(errors);
              return (
                <Form>
                  <Field
                    as={TextField}
                    type="text"
                    label="First Name"
                    name="firstName"
                    margin="dense"
                    fullWidth
                    placeholder="First Name"
                  />
                  <ErrorMessage name="firstName">
                    {(msg) => (
                      <Typography color="error" variant="body2">
                        {msg}
                      </Typography>
                    )}
                  </ErrorMessage>

                  <Field
                    as={TextField}
                    type="text"
                    label="Last Name"
                    name="lastName"
                    margin="dense"
                    fullWidth
                    placeholder="Last Name"
                  />
                  <ErrorMessage name="lastName">
                    {(msg) => (
                      <Typography color="error" variant="body2">
                        {msg}
                      </Typography>
                    )}
                  </ErrorMessage>

                  <Field
                    as={TextField}
                    type="text"
                    label="Username"
                    name="username"
                    margin="dense"
                    fullWidth
                    placeholder="Username"
                  />
                  <ErrorMessage name="username">
                    {(msg) => (
                      <Typography color="error" variant="body2">
                        {msg}
                      </Typography>
                    )}
                  </ErrorMessage>

                  <Field
                    as={TextField}
                    type="text"
                    label="Password"
                    name="password"
                    margin="dense"
                    fullWidth
                    placeholder="Password"
                  />
                  <ErrorMessage name="password">
                    {(msg) => (
                      <Typography color="error" variant="body2">
                        {msg}
                      </Typography>
                    )}
                  </ErrorMessage>

                  <Field
                    as={TextField}
                    type="text"
                    label="Password Repeat"
                    name="passwordRepeat"
                    margin="dense"
                    fullWidth
                    placeholder="Password Repeat"
                  />
                  <ErrorMessage name="passwordRepeat">
                    {(msg) => (
                      <Typography color="error" variant="body2">
                        {msg}
                      </Typography>
                    )}
                  </ErrorMessage>

                  <Button
                    disabled={Object.keys(errors).length > 0}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="primary" />
                    ) : (
                      <Typography>Register</Typography>
                    )}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
