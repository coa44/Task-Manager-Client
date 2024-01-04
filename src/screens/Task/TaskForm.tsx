import React, { FC, useCallback } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import * as yup from "yup";

import { TaskParams } from "../../app/types/Task";
import DatePicker from "../../components/DatePicker";

interface TaskFormProps {
  handleSubmit: (task: TaskParams) => void;
  initialValues: TaskParams;
  actionLabel: string;
}

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
});

const TaskForm: FC<TaskFormProps> = (props) => {
  const { handleSubmit, initialValues, actionLabel } = props;

  const onSubmit = useCallback(
    (values: TaskParams, helpers: FormikHelpers<TaskParams>) => {
      setTimeout(() => {
        handleSubmit(values);
        helpers.setSubmitting(false);
      }, 500); // Added for visual effect
    },
    [handleSubmit]
  );

  return (
    <Container component="main" maxWidth="md">
      <Paper style={{ padding: 20, marginTop: 20 }}>
        <Formik
          enableReinitialize
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting, setFieldValue }) => {
            return (
              <Form>
                <Field
                  as={TextField}
                  type="text"
                  label="Title"
                  name="title"
                  margin="dense"
                  fullWidth
                  placeholder="Title"
                />
                <ErrorMessage name="title">
                  {(msg) => (
                    <Typography color="error" variant="body2">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>

                <Field
                  as={TextField}
                  type="text"
                  label="Description"
                  name="description"
                  margin="dense"
                  fullWidth
                  placeholder="Description"
                  multiline
                  rows={4}
                />
                <ErrorMessage name="description">
                  {(msg) => (
                    <Typography color="error" variant="body2">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>

                <DatePicker
                  value={values.dueDate}
                  onChange={(date) => setFieldValue("dueDate", date)}
                  input={
                    <TextField label="Due date" margin="dense" fullWidth />
                  }
                />
                <ErrorMessage name="dueDate">
                  {(msg) => (
                    <Typography color="error" variant="body2">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>

                <FormControlLabel
                  label="Completed"
                  control={
                    <Checkbox
                      name="completed"
                      checked={values.completed}
                      onChange={(e) =>
                        setFieldValue("completed", e.target.checked)
                      }
                    />
                  }
                />

                <ErrorMessage name="completed">
                  {(msg) => (
                    <Typography color="error" variant="body2">
                      {msg}
                    </Typography>
                  )}
                </ErrorMessage>

                <Button
                  disabled={isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    <Typography>{actionLabel}</Typography>
                  )}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Paper>
    </Container>
  );
};

export default TaskForm;
