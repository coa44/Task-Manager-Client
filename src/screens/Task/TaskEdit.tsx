import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout";
import TaskForm from "./TaskForm";
import { TaskParams } from "../../app/types/Task";
import { taskSlice } from "../../app/slices/taskSlice";

const TaskEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editTask = useSelector(taskSlice.selectors.editTask);

  const { id } = useParams();

  useEffect(() => {
    dispatch(taskSlice.actions.loadTask(Number(id)));
  }, [id, dispatch]);

  const initialValues: TaskParams = {
    title: editTask?.title ?? "",
    description: editTask?.description ?? "",
    dueDate: editTask?.dueDate ? new Date(editTask.dueDate) : null,
    completed: editTask?.completed ?? false,
  };

  return (
    <Layout title="Edit task" backEnabled>
      <TaskForm
        actionLabel="Edit"
        initialValues={initialValues}
        handleSubmit={(params) =>
          dispatch(
            taskSlice.actions.updateTask({
              params,
              cb: () => navigate("/tasks"),
            })
          )
        }
      />
    </Layout>
  );
};

export default TaskEdit;
