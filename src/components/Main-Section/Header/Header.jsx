import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthenticationContextAPI } from "../../../Context-API/AuthenticationContextAPI";

const Header = () => {
  const { user, signOutUser } = useContext(AuthenticationContextAPI);

  const handelSignOutUser = () => {
    signOutUser()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      {/* Left side */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                to="/Home"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "hover:text-primary"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Email-Sign-In"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "hover:text-primary"
                }
              >
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Email-Log-In"
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : "hover:text-primary"
                }
              >
                Log in
              </NavLink>
            </li>

            {/* how to show user data if user is log in */}
            {user && (
              <>
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to=""
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary font-semibold"
                        : "hover:text-primary"
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl font-bold text-primary">
          My App
        </a>
      </div>

      {/* Center links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-6 menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/Home"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-primary text-primary font-semibold"
                  : "hover:text-primary transition-colors"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Email-Sign-In"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-primary text-primary font-semibold"
                  : "hover:text-primary transition-colors"
              }
            >
              Sign in
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Email-Log-In"
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-primary text-primary font-semibold"
                  : "hover:text-primary transition-colors"
              }
            >
              Log in
            </NavLink>
          </li>

          {/* how to show user data if user is log in */}
          {user && (
            <>
              <li>
                <NavLink
                  to="/Orders"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-primary text-primary font-semibold"
                      : "hover:text-primary transition-colors"
                  }
                >
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Profile"
                  className={({ isActive }) =>
                    isActive
                      ? "border-b-2 border-primary text-primary font-semibold"
                      : "hover:text-primary transition-colors"
                  }
                >
                  Profile
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Right side */}
      <div className="navbar-end">
        {user ? (
          <a
            onClick={handelSignOutUser}
            className="btn btn-primary hover:scale-105 transition-transform"
          >
            Sign out
          </a>
        ) : (
          <a className="btn btn-primary hover:scale-105 transition-transform">
            Sign in
          </a>
        )}
      </div>
    </div>
  );
};

export default Header;
