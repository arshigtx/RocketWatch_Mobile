import { configureStore } from '@reduxjs/toolkit';
import userPreferenceReducer from '../redux/userPreferenceSlice';
import watchlistsReducer from '../redux/watchlistsSlice';
import cryptoDataReducer from '../redux/cryptoDataSlice';
import listSectionReducer from '../redux/listSectionSlice';

export const store = configureStore({
  reducer: {
    userPreference: userPreferenceReducer,
    watchlists: watchlistsReducer,
    cryptoData: cryptoDataReducer,
    listSection: listSectionReducer,
  },
});