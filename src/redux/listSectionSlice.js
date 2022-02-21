import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  limit: 10,
  offset: 0,
}

export const listSectionSlice = createSlice({
  name: 'listSection',
  initialState,
  reducers: {
    updateLimit: (state, { payload }) => {
      state.limit = payload;
    },
    updateOffset: (state) => {
      state.offset = state.limit + state.offset
    }
  },
})

export const { updateLimit, updateOffset } = listSectionSlice.actions;

export default listSectionSlice.reducer;