import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: 'Show all',
};

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  selectors: {
    selectFilter: state => state.filter,
  },
});

export const filterReducer = slice.reducer;
export const { changeFilter } = slice.actions;
export const { selectFilter } = slice.selectors;
