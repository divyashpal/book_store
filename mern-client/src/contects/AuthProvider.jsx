import React, { createContext, useEffect, useState } from 'react'
import app from '../firebase/firebase.config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';


export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// const db = getFirestore(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const loginwithGoogle = () => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth,email,password)
  } 

  const login = (email,password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth,email,password)
  }

  const logOut = () =>{
    return signOut(auth)

  } 

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  
  const authInfo = {
      user,
      createUser,
      loginwithGoogle,
      loading,
      login,
      logOut
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider