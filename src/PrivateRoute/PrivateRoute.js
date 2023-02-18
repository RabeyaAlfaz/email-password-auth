import React from 'react';
import { Navigate } from 'react-router-dom';
import UserContext, { AuthContext } from '../components/contexts/UserContext';

const PrivateRoute = ({children}) => {
const {user,loading} = UserContext(AuthContext);
if (loading) {
    return <div>loading...</div>;
}
console.log(user);
if (user && user.uid) {
    return children;
}
return <Navigate to='/login'></Navigate>
};

export default PrivateRoute;