import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../../Firebase-Authentication/FirebaseAuthentication";
import { AuthenticationContextAPI } from "../../../Context-API/AuthenticationContextAPI";
import { useLocation, useNavigate } from "react-router-dom";

const EmailLogIn = () => {
  //How to add show password and hide password in Firebase Authentiocation system .
  const [ShowPassword, setShowPassword] = useState(false);

  // How to show the user infomation using Firebase Authentication system .
  const [EmailLoginUserInfo, setEmailLoginUserInfo] = useState([]);

  // how to send an Error massage in log in .
  const [CheackError, setCheackError] = useState("");

  // how to send an Success massage in log in .
  const [CheackSuccess, setCheackSuccess] = useState("");

  // How to use Firebase Authentication system for Email log in .
  const handelEmailLogInAuthentication = (e) => {
    // Stop the Form from refreshing the website when the button is clicked .
    e.preventDefault();

    // Get the Email value from the email input field .
    const Email = e.target.Email.value;

    // Get the Password value from the password input field .
    const Password = e.target.Password.value;

    // Clear the existing State when the form button is clicked .
    setCheackError("");
    setCheackSuccess("");
    event.target.reset();

    // Firebase Email log in function .
    signInWithEmailAndPassword(auth, Email, Password)
      .then((Result) => {
        const UserData = Result.user;
        setEmailLoginUserInfo(UserData);
        console.log("Log in data : ", UserData);
        // how to cheack if the User was Varifyed .
        if (!UserData.emailVerified) {
          setCheackError("Please varify you Email !!");
        } else {
          setCheackSuccess("You have successfuly Log in !!");
        }
      })
      .catch((Error) => {
        console.log(Error.message);
        setCheackError("Wrong Email or Password !!");
      });

    console.log("Log in Email : ", Email, "Log in Password : ", Password);
  };

  // How to use Firebase Authentication system for Email sign in using Contex API.

  // We can use "useContext" to use the ContextAPI data.
  const { signInUser, signInWithGoogle } = useContext(AuthenticationContextAPI);
  console.log(signInUser);

  // use this method to access a private route that requer a login.
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const handelEmailLogInAuthentication = (e) => {
    e.preventDefault();
    const Email = e.target.Email.value;
    const Password = e.target.Password.value;

    signInUser(Email, Password)
      .then((result) => {
        console.log(result);
        e.target.reset();

        // use this method to access a private route that requer a login.
        navigate(location.state || "/Home");
      })
      .catch((error) => console.log(error));
  };

  // How to use Firebase Authentication system for Google sign in using Contex API.
  const handelGoogleSignInAuthentication = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        // use this method to access a private route that requer a login.
        navigate(location.state || "/Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEmail = useRef();

  const handelPasswordResetEmail = () => {
    console.log(getEmail.current.value);
    const Email = getEmail.current.value;

    sendPasswordResetEmail(auth, Email)
      .then(() => {
        // how to a Password Reset Email massage .
        setCheackSuccess(
          "a Password Reset Email has send to your email . please cheack your email !!",
        );
      })
      .catch(() => {
        // send a Error massage .
      });
  };

  return (
    <>
      {/* How to use Firebase Authentication system for Email log in . */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Log in now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form
                className="fieldset"
                onSubmit={handelEmailLogInAuthentication}
              >
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="Email"
                  /* Get the Email For Reset Password */ ref={getEmail}
                />

                {/* How to add show password and hide password in Firebase Authentiocation system . */}
                <label className="label">Password</label>
                <div className="flex">
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    name="Password"
                  />
                  <div
                    className="btn btn-ghost"
                    onClick={() => setShowPassword(!ShowPassword)}
                  >
                    {ShowPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                <div>
                  <a
                    onClick={handelPasswordResetEmail}
                    className="link link-hover"
                  >
                    Forgot password?
                  </a>
                </div>
                {/* Email */}
                <button className="btn bg-white text-black border-[#e5e5e5]">
                  <svg
                    aria-label="Email icon"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="black"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  Login with Email
                </button>

                {/* Google */}
                <button
                  onClick={handelGoogleSignInAuthentication}
                  className="btn bg-white text-black border-[#e5e5e5]"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </form>
            </div>
          </div>

          {/* how show Error or Success massage . */}
          <h1 className="text-2xl text-red-500">{CheackError}</h1>
          <h1 className="text-2xl text-green-700">{CheackSuccess}</h1>

          {/* How to show the user infomation using Firebase Authentication system . */}
          <img src={EmailLoginUserInfo.photoURL} alt="User Photo" />
          <h3 className="text-3xl">Name : {EmailLoginUserInfo.displayName}</h3>
          <p>Email : {EmailLoginUserInfo.email}</p>
        </div>
      </div>
    </>
  );
};

export default EmailLogIn;
