import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext } from "react";
import { AuthenticationContextAPI } from "../../../Context-API/AuthenticationContextAPI";
import { auth } from "../../Firebase-Authentication/FirebaseAuthentication";

const EmailSignIn = () => {
  // //How to add show password and hide password in Firebase Authentiocation system .
  const [ShowPassword, setShowPassword] = useState(false);

  // How to show the user infomation using Firebase Authentication system .
  const [EmailSigninUserInfo, setEmailSigninUserInfo] = useState([]);

  // How to show Sign in success massage .
  const [EmailSigninSuccessMassage, setEmailSigninSuccessMassage] =
    useState("");

  // How to show Email exist massage .
  const [EmailSigninExistsMassage, setEmailSigninExistsMassage] = useState("");

  // How to show Password conditional massage .
  const [PasswordRequirementsMassage, setPasswordRequirementsMassage] =
    useState("");

  // how to make a cheack box Requered in Authentiocation System .
  const [CheckBoxRequeredMassage, setCheckBoxRequeredMassage] = useState("");

  //   How to use Firebase Authentication system for Email sign in .
  const handelEmailSignInAuthentication = (e) => {
    // Stop the Form from refreshing the website when the form submit button is clicked .
    e.preventDefault();

    // Get the Email value from the email input field .
    const Email = e.target.Email.value;

    // Get the Password value from the password input field .
    const Password = e.target.Password.value;

    // Get the Name value form the password input field .
    const Name = e.target.Name.value;

    // Get the Photo value from the Photo URL input field .
    const PhotoURL = e.target.Photo.value;

    // how to make a cheack box requir in Authentiocation System .
    const CheckBox = e.target.CheckBox.checked;
    console.log(CheckBox);
    // setCheckBoxRequerMassage(!CheckBox);
    if (!CheckBox) {
      setCheckBoxRequeredMassage("Please Accept Our Terms & Condition");
      return;
    } else {
      // Clear the existing State when the form button is clicked .
      setCheckBoxRequeredMassage("");
    }

    // Clear the existing State when the form button is clicked .
    setEmailSigninSuccessMassage("");
    setEmailSigninExistsMassage("");
    setPasswordRequirementsMassage("");
    event.target.reset();

    // Conditional check of Password requirements .
    const PasswordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (PasswordRegExp.test(Password) === false) {
      setPasswordRequirementsMassage(
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number.",
      );
      return;
    }

    // Firebase Email sign in function .
    createUserWithEmailAndPassword(auth, Email, Password)
      .then((Result) => {
        const UserData = Result.user;
        setEmailSigninUserInfo(UserData);

        // how to add an Email Verification functionality using Firebase Authentication .
        sendEmailVerification(UserData)
          .then(() => {
            // How to show Sign in success massage .
            setEmailSigninSuccessMassage(
              "Sign in successfull !! We have Send you an Email Verification link , Pleasy varify your Eamil !!",
            );
          })
          .catch(() => {
            // send a Error massage .
          });

        // how to add or update Profile using Firebase Authentication .
        const Profile = {
          displayName: Name,
          photoURL: PhotoURL,
        };
        updateProfile(UserData, Profile)
          .then(() => {
            // send a Success massage .
          })
          .catch(() => {
            // send a Error massage .
          });

        console.log("Sign in data : ", UserData);
      })

      .catch((Error) => {
        console.log(Error.message);

        // How to show Firebase error message .
        setEmailSigninExistsMassage("This email already exists !!");
      });

    console.log("Sign in Email : ", Email, "Sign in Password : ", Password);
  };

  // How to use Firebase Authentication system for Email sign in using Contex API.

  // We can use "useContext" to use the ContextAPI data.
  const { CreateUser } = useContext(AuthenticationContextAPI);
  console.log(CreateUser);

  const handelEmailSignInAuthentication = (e) => {
    e.preventDefault();
    const Email = e.target.Email.value;
    const Password = e.target.Password.value;

    CreateUser(Email, Password)
      .then((result) => {
        console.log(result);
        e.target.reset();
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {/* How to use Firebase Authentication system for Email sign in . */}
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Sign in now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form
                className="fieldset"
                onSubmit={handelEmailSignInAuthentication}
              >
                <label className="label">Your Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter you Name"
                  name="Name"
                />

                <label className="label">Photo URL</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Your Photo URL"
                  name="Photo"
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="Email"
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
                    onClick={() => setShowPassword(!ShowPassword)}
                    className="btn btn-ghost"
                  >
                    {ShowPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>

                {/* how to make a cheack box requir in Authentiocation System . */}
                <label className="label">
                  <input type="checkbox" name="CheckBox" className="checkbox" />
                  Accept Terms & Conditions
                </label>

                <button className="btn btn-neutral mt-4">Sign in</button>
              </form>
            </div>
          </div>

          {/* Show sign‑in message on conditional basis . */}
          {
            /* if */ CheckBoxRequeredMassage ? (
              <p className="text-red-500">{CheckBoxRequeredMassage}</p>
            ) 
            : /* else if */ PasswordRequirementsMassage ? (
              <p className="text-red-500">{PasswordRequirementsMassage}</p>
            ) 
            : /* else if */ EmailSigninSuccessMassage ? (
              <h1 className="text-2xl text-green-700">
                {EmailSigninSuccessMassage}
              </h1>
            ) 
            : (
              /* else */ EmailSigninExistsMassage && (
                <h1 className="text-2xl text-red-500">
                  {EmailSigninExistsMassage}
                </h1>
              )
            )
          }

          {/* How to show the user infomation using Firebase Authentication system . */}
          <img src={EmailSigninUserInfo.photoURL} alt="User Photo" />
          <h3 className="text-3xl">Name : {EmailSigninUserInfo.displayName}</h3>
          <p>Email : {EmailSigninUserInfo.email}</p>
        </div>
      </div>
    </>
  );
};

export default EmailSignIn;
