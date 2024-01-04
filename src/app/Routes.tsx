import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Register from "../screens/Auth/Register/Register";
import RegisterSuccess from "../screens/Auth/Register/RegisterSuccess";
import Login from "../screens/Auth/Login/Login";
import Tasks from "../screens/Task/Tasks";
import TaskCreate from "../screens/Task/TaskCreate";
import TaskEdit from "../screens/Task/TaskEdit";

export const Public = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/success" element={<RegisterSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </Router>
  );
};

export const Private = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/create" element={<TaskCreate />} />
        <Route path="/tasks/:id/edit" element={<TaskEdit />} />
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </Router>
  );
};
