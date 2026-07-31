import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { AuthenticationContextAPI } from "./AuthenticationContextAPI.JSX";
import { auth } from "../components/Firebase-Authentication/FirebaseAuthentication";
import { useEffect, useState } from "react";

const AuthenticationContextApiProvider = ({ children }) => {
  // how to use loding state to keep the the private route open.
  const [loding, setLoding] = useState(true);

  // How to use Firebase Authentication system for Google sign in using Contex API.
  const GoggleAuthentication = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoding(true);
    signInWithPopup(auth, GoggleAuthentication);
  };

  // How to use Firebase Authentication system for Email sign in using Contex API.
  const CreateUser = (Email, Password) => {
    setLoding(true);
    return createUserWithEmailAndPassword(auth, Email, Password);
  };

  // How to use Firebase Authentication system for Email log in using Contex API.
  const signInUser = (Email, Password) => {
    setLoding(true);
    return signInWithEmailAndPassword(auth, Email, Password);
  };

  //How to get currrent log in user information in Firebase Authentication using Contex API.
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoding(false);
      console.log("User Found", currentUser);
    });

    return () => unsubscribe;
  }, []);

  //How to use sign out user fuction in Firebase Authentication using Contex API.
  const signOutUser = () => {
    return signOut(auth);
  };

  const value = { CreateUser, signInUser, user, signOutUser, loding, signInWithGoogle };

  return (
    <AuthenticationContextAPI.Provider value={value}>
      {children}
    </AuthenticationContextAPI.Provider>
  );
};

export default AuthenticationContextApiProvider;
