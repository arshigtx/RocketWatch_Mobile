import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  watchlists: []
}

export const watchlistsSlice = createSlice({
  name: 'watchlists',
  initialState,
  reducers: {
    updateWatchlists: (state, { payload }) => {
      state.watchlists = payload;
    },
  },
})

export const { updateWatchlists } = watchlistsSlice.actions;

export default watchlistsSlice.reducer;