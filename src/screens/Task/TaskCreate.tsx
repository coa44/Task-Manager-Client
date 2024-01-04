import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TaskParams } from "../../app/types/Task";
import Layout from "../../components/Layout";
import TaskForm from "./TaskForm";
import { taskSlice } from "../../app/slices/taskSlice";

const TaskCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: TaskParams = {
    title: "",
    description: "",
    dueDate: null,
    completed: false,
  };

  return (
    <Layout title="Create task" backEnabled>
      <TaskForm
        actionLabel="Create"
        initialValues={initialValues}
        handleSubmit={(data) =>
          dispatch(
            taskSlice.actions.createTask({
              params: data,
              cb: () => navigate("/tasks"),
            })
          )
        }
      />
    </Layout>
  );
};

export default TaskCreate;
