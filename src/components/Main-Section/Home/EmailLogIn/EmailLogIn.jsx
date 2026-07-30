import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../../../Firebase-Authentication/FirebaseAuthentication";
import { AuthenticationContextAPI } from "../../../../Context-API/AuthenticationContextAPI";

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
  const { signInUser } = useContext(AuthenticationContextAPI);
  console.log(signInUser);

  const handelEmailLogInAuthentication = (e) => {
    e.preventDefault();
    const Email = e.target.Email.value;
    const Password = e.target.Password.value;

    signInUser(Email, Password)
      .then((result) => {
        console.log(result);
        e.target.reset();
      })
      .catch((error) => console.log(error));
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
                    type={ShowPassword ? "text" : "password"}
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
                <button className="btn btn-neutral mt-4">Log in</button>
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
