import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const addCard = createAsyncThunk(
  'card/addCard',
  async (card, thunkAPI) => {
    try {
      console.log('card: ', card);
      const { data } = await api.post('/card', card);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editCard = createAsyncThunk(
  'card/editCard',
  async (
    { _id, title, description, priority, deadline, columnId, boardId },
    thunkAPI
  ) => {
    try {
      const { data } = await api.put(`/card/${_id}`, {
        title,
        description,
        priority,
        deadline,
        columnId,
        boardId,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  'card/deleteCard',
  async ({ cardId, columnId }, thunkAPI) => {
    try {
      await api.delete(`/card/${cardId}`);
      return { cardId, columnId };
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
