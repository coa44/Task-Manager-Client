import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  List,
  Pagination,
  CardActions,
  IconButton,
  Button,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Layout from "../../components/Layout";
import RequireAuthentication from "../../components/RequireAuthentication";
import { taskSlice } from "../../app/slices/taskSlice";
import { formatDate } from "../../app/utils/formatters";
import { applicationSlice } from "../../app/slices/applicationSlice";

const TaskList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector(taskSlice.selectors.tasks);
  const pagination = useSelector(taskSlice.selectors.pagination);

  const { page, pageSize, total } = pagination;
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    dispatch(taskSlice.actions.loadTasks());
  }, [dispatch]);

  const handleChangePage = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      dispatch(taskSlice.actions.setPagination({ ...pagination, page }));
      dispatch(taskSlice.actions.loadTasks());
    },
    [pagination, dispatch]
  );

  const handleCreate = () => {
    navigate("/tasks/create");
  };

  const handleEdit = (id: number) => {
    navigate(`/tasks/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    dispatch(
      applicationSlice.actions.setConfirmationDialog({
        title: "Delete Task",
        text: "Are you sure you want to delete selected task",
        cb: () => {
          dispatch(taskSlice.actions.deleteTask(id));
        },
      })
    );
  };

  return (
    <Layout title="Tasks">
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          height: "calc(100vh - 64px)",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 0.9,
            justifyContent: "center",
          }}
        >
          <List style={{ width: "90%" }}>
            <RequireAuthentication>
              <Button
                style={{
                  marginBottom: 15,
                  marginTop: 15,
                }}
                variant="contained"
                onClick={handleCreate}
              >
                Create
              </Button>
            </RequireAuthentication>
            {tasks.map((task, index) => (
              <Card
                key={index}
                style={{
                  marginBottom: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: task.completed
                    ? "lightgreen"
                    : "lightyellow",
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6">{task.title}</Typography>
                  {task.description && (
                    <Typography variant="body1" color="textSecondary">
                      Description: {task.description}
                    </Typography>
                  )}
                  {task.dueDate && (
                    <Typography variant="body1" color="textSecondary">
                      Due Date: {formatDate(task.dueDate)}
                    </Typography>
                  )}
                </CardContent>

                <RequireAuthentication>
                  <CardActions>
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(task.id!)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(task.id!)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </RequireAuthentication>
              </Card>
            ))}
          </List>
        </div>
        <div
          style={{
            display: "flex",
            flex: 0.1,
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
        </div>
      </div>
    </Layout>
  );
};

export default TaskList;
