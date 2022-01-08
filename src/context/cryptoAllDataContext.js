import React, { createContext, useReducer } from 'react';

export const CryptoAllDataContext = createContext([]);

export const CryptoAllDataProvider = (props) => {

  const [state, dispatch] = useReducer(cryptoAllDataReducer, []);

  function updateData(newData) {
    dispatch({
      type: 'updateData',
      payload: newData
    });
  }

  return <CryptoAllDataContext.Provider value={{ data: state, updateData}}>{props.children}</CryptoAllDataContext.Provider>;
}

//reducer
export const cryptoAllDataReducer = (state, { type, payload }) => {
  switch(type) {
    case 'updateData':
      return [...state, ...payload]
    default:
      return state;
  }
}

