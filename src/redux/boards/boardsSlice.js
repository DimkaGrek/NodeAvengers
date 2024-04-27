import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addBoard,
  deleteBoard,
  editBoard,
  getBoard,
  getBoards,
} from './boardsOperations';
import { addColumn, deleteColumn, editColumn } from './columnOperations';
import { addCard, deleteCard, editCard } from './cardOperations';
import { logoutThunk } from '../auth/operations';

const initialState = {
  boards: [],
  currentBoard: [],
  isLoading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getBoards.fulfilled, (state, { payload }) => {
        state.boards = payload;
        // state.currentBoard = payload[0];
        state.isLoading = false;
      })
      .addCase(addBoard.fulfilled, (state, { payload }) => {
        state.boards.push(payload);
        state.currentBoard = payload;
        state.isLoading = false;
      })
      .addCase(getBoard.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
        state.isLoading = false;
      })
      .addCase(editBoard.fulfilled, (state, { payload }) => {
        state.currentBoard = payload;
        const index = state.boards.findIndex(
          board => board._id === payload._id
        );
        state.boards[index] = payload;
        state.isLoading = false;
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

        state.isLoading = false;
      })
      .addCase(addColumn.fulfilled, (state, { payload }) => {
        state.currentBoard.columns.push(payload);
        state.isLoading = false;
      })
      .addCase(editColumn.fulfilled, (state, { payload }) => {
        const indexColumn = state.currentBoard.columns.findIndex(
          item => item._id === payload._id
        );

        state.currentBoard.columns[indexColumn].name = payload.name;
        state.isLoading = false;
      })
      .addCase(deleteColumn.fulfilled, (state, { payload }) => {
        const index = state.currentBoard.columns.findIndex(
          column => column._id === payload
        );

        state.currentBoard.columns.splice(index, 1);
        state.isLoading = false;
      })
      .addCase(addCard.fulfilled, (state, { payload }) => {
        const index = state.currentBoard.columns.findIndex(
          column => column._id === payload.columnId
        );

        state.currentBoard.columns[index].cards.push(payload);
        state.isLoading = false;
      })
      .addCase(editCard.fulfilled, (state, { payload }) => {
        const indexColumn = state.currentBoard.columns.findIndex(
          column => column._id === payload.columnId
        );

        const indexCard = state.currentBoard.columns[
          indexColumn
        ].cards.findIndex(card => card._id === payload._id);

        if (indexCard === -1) {
          const oldColumn = state.currentBoard.columns.findIndex(column =>
            column.cards.some(card => card._id === payload._id)
          );

          const oldCard = state.currentBoard.columns[oldColumn].cards.findIndex(
            card => card._id === payload._id
          );

          state.currentBoard.columns[oldColumn].cards.splice(oldCard, 1);
          state.currentBoard.columns[indexColumn].cards.push(payload);
        } else {
          state.currentBoard.columns[indexColumn].cards[indexCard] = payload;
          state.isLoading = false;
        }
      })
      .addCase(deleteCard.fulfilled, (state, { payload }) => {
        console.log(payload);
        const indexColumn = state.currentBoard.columns.findIndex(
          column => column._id === payload.columnId
        );

        const indexCard = state.currentBoard.columns[
          indexColumn
        ].cards.findIndex(card => card._id === payload.cardId);

        state.currentBoard.columns[indexColumn].cards.splice(indexCard, 1);
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          getBoards.pending,
          addBoard.pending,
          getBoard.pending,
          editBoard.pending,
          deleteBoard.pending,
          addColumn.pending,
          editColumn.pending,
          deleteColumn.pending,
          addCard.pending,
          editCard.pending,
          deleteCard.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getBoards.rejected,
          addBoard.rejected,
          getBoard.rejected,
          editBoard.rejected,
          deleteBoard.rejected,
          addColumn.rejected,
          editColumn.rejected,
          deleteColumn.rejected,
          addCard.rejected,
          editCard.rejected,
          deleteCard.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      );
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
