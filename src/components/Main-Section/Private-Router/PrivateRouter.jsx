// How to show a private Route based on user log in or not .

import React, { useContext } from "react";
import { AuthenticationContextAPI } from "../../../Context-API/AuthenticationContextAPI";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user, loding } = useContext(AuthenticationContextAPI);

  // use this method to access a private route that requer a login.
  const location = useLocation();
  console.log(location);

  // how to use loding state to keep the the private route open.
  if (loding) {
    return <>loding...</>;
  }

  if (user) {
    return children;
  } else {
    
    // use this method to access a private route that requer a login.
    return <Navigate state={location?.pathname} to="/Email-Log-In" />;
  }
};

export default PrivateRouter;
