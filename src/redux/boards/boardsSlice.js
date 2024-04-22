import { createSlice } from '@reduxjs/toolkit';
import {
  addBoard,
  deleteBoard,
  editBoard,
  getBoard,
  getBoards,
} from './boardsOperations';
import { addColumn, deleteColumn, editColumn } from './columnOperations';

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
      .addCase(addBoard.fulfilled, (state, { payload }) => {
        state.boards.push(payload);
        state.currentBoard = payload;
      })
      .addCase(addColumn.fulfilled, (state, { payload }) => {
        state.currentBoard.columns.push(payload);
      })
      .addCase(getBoard.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
      })
      // .addCase(getColumn.fulfilled, (state, { payload }) => {
      //   state.currentBoard.columns.push(payload);
      // })
      .addCase(editBoard.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
      })
      .addCase(editColumn.fulfilled, (state, { payload }) => {
        const indexColumn = state.currentBoard.columns.findIndex(
          item => item._id === payload._id
        );
        console.log(indexColumn);
        state.currentBoard.columns[indexColumn] = payload;
      })
      .addCase(deleteBoard.fulfilled, (state, { payload }) => {
        const board = state.boards.find(item => item._id === payload);
        const index = state.boards.findIndex(board => board._id === payload);

        if (board._id === state.currentBoard._id) {
          if (index === 0) {
            state.boards.splice(index, 1);
            state.currentBoard = state.boards[0];
          } else {
            state.currentBoard = state.boards[index - 1];
            state.boards.splice(index, 1);
          }
        } else {
          state.boards.splice(index, 1);
        }
      })
      .addCase(deleteColumn.fulfilled, (state, { payload }) => {
        const index = state.currentBoard.columns.findIndex(
          column => column._id === payload
        );
        state.currentBoard.columns.splice(index, 1);
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
