import { createSlice } from '@reduxjs/toolkit';
import { editBoard, getBoard, getBoards } from './boardsOperations';

const initialState = {
  boards: [],
  currentBoard: [],
  isLoading: false,
  isError: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.boards = payload;
        state.currentBoard = payload[0];
      })
      .addCase(getBoard.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
      })
      .addCase(editBoard.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
      });
  },
  selectors: {
    selectBoards: state => state.boards,
    selectCurrentBoard: state => state.currentBoard,
    selectIsLoading: state => state.isLoading,
    selectIsError: state => state.isErrorrror,
  },
});

export const boardsReducer = boardsSlice.reducer;
export const {
  selectBoards,
  selectCurrentBoard,
  selectIsLoading,
  selectIsError,
} = boardsSlice.selectors;
