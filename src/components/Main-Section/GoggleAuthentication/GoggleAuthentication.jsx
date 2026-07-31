import { useState } from "react";
import { auth } from "../../Firebase-Authentication/FirebaseAuthentication";
import { GoogleAuthProvider, signInWithPopup, signOut, } from "firebase/auth";

const GoggleAuthentication = () => {

    // How to declare Firebase Authentication system for Google sign in or log in .
    const GoggleAuthentication = new GoogleAuthProvider();

    // How to show the user infomation using Firebase Authentication system .
    const [GoogleUserInfo, setGoogleUserInfo] = useState([]);


    // How to use Firebase Authentication system for Google sign in or log in .
    const handelGoogleSignInAuthentication = () => {

        // How to use Firebase Authentication system for Google sign in or log in .
        signInWithPopup(auth, GoggleAuthentication)
            .then(result => {
                console.log(result.user);

                // How to show the user infomation using Firebase Authentication system .
                setGoogleUserInfo(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    // How to use Firebase Authentication system to sign out .
    const handelGoogleSignOutAuthentication = () => {
        signOut(auth)
            .then(() => {
                alert('Signed out successfully!');
                setGoogleUserInfo(null);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            {/* Conditional Authentication Button switch */}
            {
                GoogleUserInfo ?
                    <>
                        {/* How to use Firebase Authentication system for Google sign in . */}
                        <button onClick={handelGoogleSignOutAuthentication} className="btn btn-primary">Sign Out From Google</button>
                    </>
                    :
                    <>
                        {/* How to use Firebase Authentication system for Google sign in . */}
                        <button onClick={handelGoogleSignInAuthentication} className="btn btn-primary">Sign In With Google</button>
                    </>
            }

            {/* How to show the user infomation using Firebase Authentication system . */}
            {
                GoogleUserInfo ?
                    <div>
                        <img src={GoogleUserInfo.photoURL} alt="User Photo" />
                        <h3>{GoogleUserInfo.displayName}</h3>
                    </div>
                    :
                    <h1 className="text-2xl">No User Info</h1>
            }
        </>
    );
};

export default GoggleAuthentication;