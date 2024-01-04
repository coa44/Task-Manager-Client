import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { authenticationSlice } from "../../../app/slices/authenticationSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <RegisterForm
      handleSubmit={(params) =>
        dispatch(
          authenticationSlice.actions.register({
            params,
            cb: () => navigate("/register/success"),
          })
        )
      }
    />
  );
};

export default Register;
