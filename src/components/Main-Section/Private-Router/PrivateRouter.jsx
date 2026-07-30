// How to show a private Route based on user log in or not .

import React, { useContext } from "react";
import { AuthenticationContextAPI } from "../../../Context-API/AuthenticationContextAPI";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user } = useContext(AuthenticationContextAPI);
  if (user) {
    return children;
  } 
  else {
    return <Navigate to="/Email-Log-In"/>
  }
};

export default PrivateRouter;
