import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";

const RegisterSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Registration Successful!
      </Typography>

      <Typography variant="body1">
        Thank you for registering. Your account has been successfully created.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
        style={{ marginTop: "20px" }}
      >
        Continue
      </Button>
    </div>
  );
};

export default RegisterSuccess;
