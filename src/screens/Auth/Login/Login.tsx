import React from "react";
import { useDispatch } from "react-redux";
import LoginForm from "./LoginForm";
import { authenticationSlice } from "../../../app/slices/authenticationSlice";

const Login = () => {
  const dispatch = useDispatch();

  return (
    <LoginForm
      handleSubmit={(params) =>
        dispatch(authenticationSlice.actions.login({ params }))
      }
    />
  );
};

export default Login;
