import React, { createContext, useReducer } from 'react';

export const CryptoDataContext = createContext(null);

export const CryptoDataProvider = (props) => {

  const [state, dispatch] = useReducer(themeReducer, null);

  function updateData() {
    dispatch({
      type: 'updateData',
      payload: themes.dark
    });
  }

  return <CryptoDataContext.Provider value={{ theme: state, updateData}}>{props.children}</CryptoDataContext.Provider>;
}

//reducer
export const cryptoDataReducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_TO_DARK_THEME':
      return themes.dark
    case 'CHANGE_TO_LIGHT_THEME':
      return themes.light
    default:
      return state;
  }
}

