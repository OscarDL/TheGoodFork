import React, { createContext, useContext, useReducer } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ initialState, reducer, children }) => (
  <AuthContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AuthContext.Provider>
);

export const useAuthContext = () => useContext(AuthContext);