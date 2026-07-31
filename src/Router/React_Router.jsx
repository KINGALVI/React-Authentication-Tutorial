import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorHandel from "../components/HandelError/ErrorHandel";
import MainSection from "../components/Main-Section/MainSection";
import Home from "../components/Main-Section/Home/Home";
import EmailSignIn from "../components/Main-Section/EmailSignIn/EmailSignIn";
import EmailLogIn from "../components/Main-Section/EmailLogIn/EmailLogIn";
import Profile from "../components/Main-Section/Profile/Profile";
import Orders from "../components/Main-Section/Orders/Orders";
import PrivateRouter from "../components/Main-Section/Private-Router/PrivateRouter";
import DashBoard from "../components/Main-Section/DashBoard/DashBoard";

const React_Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <MainSection />,

      errorElement: <ErrorHandel />,

      children: [
        {
          path: "/Home",
          Component: Home,
        },
        {
          path: "/Email-Sign-In",
          Component: EmailSignIn,
        },
        {
          path: "/Email-Log-In",
          Component: EmailLogIn,
        },

        // How to show a private Route based on user log in or not .
        {
          path: "/Orders",
          element: (
            <PrivateRouter>
              <Orders />
            </PrivateRouter>
          ),
        },
        {
          path: "/Profile",
          element: (
            <PrivateRouter>
              <Profile />
            </PrivateRouter>
          ),
        },
        {
          path: "/DashBoard",
          element: (
            <PrivateRouter>
              <DashBoard />
            </PrivateRouter>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default React_Router;
