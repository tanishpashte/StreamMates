import React, { useContext } from 'react'; // Add this line
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { state } = useContext(AuthContext);

  if (state.isLoading){
    return <h1>Checking authentication...</h1>;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;