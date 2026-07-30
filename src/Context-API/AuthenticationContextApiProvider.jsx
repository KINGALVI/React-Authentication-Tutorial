import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AuthenticationContextAPI } from "./AuthenticationContextAPI.JSX";
import { auth } from "../components/Firebase-Authentication/FirebaseAuthentication";

const AuthenticationContextApiProvider = ({ children }) => {

  const CreateUser = (Email, Password) => {
    return createUserWithEmailAndPassword(auth, Email, Password);
  };

  const signInUser =(Email,Password)=>{
    return signInWithEmailAndPassword(auth, Email, Password)
  }

  const value = {CreateUser, signInUser};

  return (
    <AuthenticationContextAPI.Provider value={value}>
      {children}
    </AuthenticationContextAPI.Provider>
  );
};

export default AuthenticationContextApiProvider;
