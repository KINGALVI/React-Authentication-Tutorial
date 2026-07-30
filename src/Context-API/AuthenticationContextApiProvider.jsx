import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthenticationContextAPI } from "./AuthenticationContextAPI.JSX";
import { auth } from "../components/Firebase-Authentication/FirebaseAuthentication";
import { useEffect, useState } from "react";

const AuthenticationContextApiProvider = ({ children }) => {
  // How to use Firebase Authentication system for Email sign in using Contex API.
  const CreateUser = (Email, Password) => {
    return createUserWithEmailAndPassword(auth, Email, Password);
  };

  // How to use Firebase Authentication system for Email log in using Contex API.
  const signInUser = (Email, Password) => {
    return signInWithEmailAndPassword(auth, Email, Password);
  };

  //How to get currrent log in user information in Firebase Authentication using Contex API.
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User Found", currentUser);
    });

    return () => unsubscribe;
  }, []);

  //How to use sign out user fuction in Firebase Authentication using Contex API.
  const signOutUser = () => {
    return signOut(auth);
  };

  const value = { CreateUser, signInUser, user, signOutUser };

  return (
    <AuthenticationContextAPI.Provider value={value}>
      {children}
    </AuthenticationContextAPI.Provider>
  );
};

export default AuthenticationContextApiProvider;
