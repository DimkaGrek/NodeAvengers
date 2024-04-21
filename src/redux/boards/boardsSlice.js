import { createSlice } from '@reduxjs/toolkit';
import { getBoards } from './boardsOperations';

const initialState = {
  boards: [],
  isLoading: false,
  isError: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  extraReducers: builder => {
    builder.addCase(getBoards.fulfilled, (state, { payload }) => {
      state.boards = payload;
    });
  },
  selectors: {
    selectBoards: state => state.boards,
    selectIsLoading: state => state.isLoading,
    selectIsError: state => state.isErrorrror,
  },
});

export const boardsReducer = boardsSlice.reducer;
export const { selectBoards, selectIsLoading, selectIsError } =
  boardsSlice.selectors;
