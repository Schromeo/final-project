import React, { createContext, useState } from "react";
import Routing from "./components/global/Routing";
import logo from './logo.svg';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from './firebase.js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

export const AuthContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
              toast.success("Signed in!", {
                position: toast.POSITION.TOP_CENTER,
                theme: "colored"
              })
              return true;
            })
            .catch((error) => {
              if (error.code === 'auth/invalid-email') {
                toast.error("Invalid email!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              if (error.code === 'auth/user-not-found') {
                toast.error("There is no user account linked to this email!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              if (error.code === 'auth/wrong-password') {
                toast.error("Wrong password! Try again.", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              if (error.code === 'auth/missing-email') {
                toast.error("Email is required!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              if (error.code === 'auth/missing-password') {
                toast.error("Password is required!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              console.log(error);
              return false;
            });
        },
        register: async (email, password, username) => {
          await createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
              // Signed in 
              const user = userCredential.user;
              // set user display name to username
              await updateProfile(user, {
                displayName: username
              }).then(() => {
                toast.success("Signed in!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }).catch((error) => {
                console.log(error);
              })
              return true;
            })
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                toast.error("Email already in use!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              if (error.code === 'auth/invalid-email') {
                toast.error("Invalid email!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              if (error.code === 'auth/weak-password') {
                toast.error("Password should be at least 6 characters!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              if (error.code === 'auth/missing-email') {
                toast.error("Email is required!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              if (error.code === 'auth/missing-password') {
                toast.error("Password is required!", {
                  position: toast.POSITION.TOP_CENTER,
                  theme: "colored"
                })
              }
              console.log(error);
              return false;
            });
        },
        logout: async () => {
          await signOut(auth).then(() => {
            toast.success("Signed out!", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored"
            })
          }).catch((error) => {
            toast.error("Error signing out!", {
              position: toast.POSITION.TOP_CENTER,
              theme: "colored"
            })
            console.log(error);
          })
        }
      }}
    >
      <Routing />
      <ToastContainer />
    </AuthContext.Provider>
  );
}