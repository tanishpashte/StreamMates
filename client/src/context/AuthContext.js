import React, { createContext, useEffect, useReducer } from "react";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token') || null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'VERIFY_TOKEN': 
      return {
        ...state,
        isAuthenticated: !!state.token, 
      };
    default:
      return state;
  }
};

const AuthContext = createContext(initialState);

const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        dispatch({type: 'VERIFY_TOKEN'});
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
