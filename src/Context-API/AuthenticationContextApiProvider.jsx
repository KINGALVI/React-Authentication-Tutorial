import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthenticationContextAPI } from "./AuthenticationContextAPI.JSX";
import { auth } from "../components/Firebase-Authentication/FirebaseAuthentication";

const AuthenticationContextApiProvider = ({ children }) => {

  const CreateUser = (Email, Password) => {
    return createUserWithEmailAndPassword(auth, Email, Password);
  };

  const value = {CreateUser};

  return (
    <AuthenticationContextAPI.Provider value={value}>
      {children}
    </AuthenticationContextAPI.Provider>
  );
};

export default AuthenticationContextApiProvider;
