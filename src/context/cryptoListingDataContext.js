import React, { createContext, useReducer } from 'react';

export const CryptoListingDataContext = createContext([]);

export const CryptoListingDataProvider = (props) => {

  const [state, dispatch] = useReducer(cryptoListingDataReducer, []);

  function updateData(newData) {
    dispatch({
      type: 'updateData',
      payload: newData
    });
  }

  return <CryptoListingDataContext.Provider value={{ data: state, updateData}}>{props.children}</CryptoListingDataContext.Provider>;
}

//reducer
export const cryptoListingDataReducer = (state, { type, payload }) => {
  switch(type) {
    case 'updateData':
      return payload
    default:
      return state;
  }
}

