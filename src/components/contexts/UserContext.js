import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import app from '../firebase/firebase.init';
import React, { useEffect, useState } from 'react';
import PrivateRoute from '../../PrivateRoute/PrivateRoute';

export const AuthContext = React.createContext();
const auth = getAuth(app);
const UserContext = ({children}) => {
const [user,setUser] = useState({}); 
const [loading ,setLoading] = useState(true);
const createUser = (email,password) =>{
   return createUserWithEmailAndPassword(auth,email,password);
}

const loginUser = (email,password) =>{
    return signInWithEmailAndPassword(auth,email,password);
}

useEffect(()=>{
  const unsubscribe =  onAuthStateChanged (auth , currentUser=>{
    setUser(currentUser); 
    setLoading(false);
    })
    return()=>{
        unsubscribe();
    }
},[]);
const authInfo = {user,createUser,loginUser,loading};
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
            {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;