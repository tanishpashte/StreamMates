import React, { createContext, useEffect, useReducer } from "react";
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        isLoading: false,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case 'VERIFY_TOKEN': 
      return {
        ...state,
        isAuthenticated: !!state.token, 
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading:action.payload,
      }
    default:
      return state;
  }
};

const AuthContext = createContext(initialState);

const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const checkAuthStatus = async () => {
          if(state.token){
            dispatch({type: 'VERIFY_TOKEN'});
            try {
              const config = {
                headers: {'x-auth-token': state.token},
              };
              const res = await axios.get('http://localhost:5000/api/users/me', config);
              dispatch({type: 'SET_USER', payload: res.data});
            } catch (error) {
              console.error('Failed to fetch user data:', err.response.data);
              dispatch({ type: 'LOGOUT' });
            }
          }else{
            dispatch({type: 'SET_LOADING', payload: false});
          }
        };
        checkAuthStatus();
    }, []);

    const login = (token) => {
        dispatch({type: 'LOGIN', payload: {token}});
    };

    const logout = () => {
        dispatch({type: 'LOGOUT'});
    };

    const setUser = (user) => {
      dispatch({type: 'SET_USER', payload: user});
    };

    const value = {
      state,
      login,
      logout,
      setUser
    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider};
