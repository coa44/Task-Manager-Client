import * as React from "react";
import { useSelector } from "react-redux";
import { authenticationSlice } from "../app/slices/authenticationSlice";

interface RequireAuthenticationProps {
  children: React.ReactElement<any, any> | null;
}

/**
 * HOC with conditional rendering of children component based on the authentication state
 */
const RequireAuthentication: React.FC<RequireAuthenticationProps> = (props) => {
  const { children } = props;

  const authenticationToken = useSelector(
    authenticationSlice.selectors.authenticationToken
  );

  const isAuthenticated = authenticationToken !== null;

  if (isAuthenticated) {
    return children;
  }

  return null;
};

export default RequireAuthentication;
