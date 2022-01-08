import React, { createContext, useReducer } from 'react';
import { light, dark } from '../constants/colorTheme';

export const themes = {
  light,
  dark
}

export const ThemeContext = createContext(themes.dark);

export const ThemeProvider = ({children}) => {

  const [state, dispatch] = useReducer(themeReducer, themes.dark);

  function changeToDarkTheme() {
    dispatch({
      type: 'CHANGE_TO_DARK_THEME',
      payload: themes.dark
    });
  }

  function changeToLightTheme() {
    dispatch({
      type: 'CHANGE_TO_LIGHT_THEME',
      payload: themes.light
    });
  }

  return <ThemeContext.Provider value={{ theme: state, changeToDarkTheme, changeToLightTheme}}>{children}</ThemeContext.Provider>;
}

//reducer
export const themeReducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_TO_DARK_THEME':
      return themes.dark
    case 'CHANGE_TO_LIGHT_THEME':
      return themes.light
    default:
      return state;
  }
}

