import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cryptoData: []
}

export const cryptoDataSlice = createSlice({
  name: 'cryptoData',
  initialState,
  reducers: {
    addToCryptoData: (state, { payload }) => {
      state.cryptoData = [...state.cryptoData, ...payload];
    },
    refreshCryptoData: (state, { payload }) => {
      state.cryptoData = payload;
    },
  },
})

export const { addToCryptoData, refreshCryptoData  } = cryptoDataSlice.actions;

export default cryptoDataSlice.reducer;