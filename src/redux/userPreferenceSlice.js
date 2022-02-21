import { createSlice } from '@reduxjs/toolkit';
import { colorTheme } from '../constants/colorTheme';

const initialState = {
  theme: colorTheme["dark"],
  currency: null,
}

export const userPreferenceSlice = createSlice({
  name: 'userPreference',
  initialState,
  reducers: {
    updateTheme: (state, { payload }) => {
      state.theme = {...colorTheme[payload]};
    },
    changeToDarkTheme: (state) => {
      state.theme = dark
    },
    changeToLightTheme: (state) => {
      state.theme = light
    },
    changeStateCurrency: (state, { payload }) => {
      state.currency = payload
    },
  },
})

export const { changeToDarkTheme, changeToLightTheme, changeStateCurrency, updateTheme } = userPreferenceSlice.actions;

export default userPreferenceSlice.reducer;