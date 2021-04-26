import React, { createContext, useContext, useReducer } from 'react';

export const DataLayerContext = createContext({
  user: null,
  token: null,
  order: null
});

export const DataLayer = ({ initialState, reducer, children }) => (
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>
)

export const useDataLayerValue = () => useContext(DataLayerContext);