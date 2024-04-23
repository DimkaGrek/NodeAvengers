import { createSlice } from '@reduxjs/toolkit';
import { getThemesList } from './operations';

const initialState = {
  themes: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'themes',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getThemesList.pending, state => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getThemesList.fulfilled, (state, { payload }) => {
        state.themes = payload;
        state.isLoading = false;
      })
      .addCase(getThemesList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
  selectors: {
    selectThemesList: state => state.themes,
  },
});

export const themesReducer = slice.reducer;
export const { selectThemesList } = slice.selectors;
