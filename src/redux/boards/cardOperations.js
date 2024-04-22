import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const addCard = createAsyncThunk(
  'card/addCard',
  async (card, thunkAPI) => {
    try {
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
    { _id, title, description, priority, deadline, columnId },
    thunkAPI
  ) => {
    try {
      const { data } = await api.put(`/card/${_id}`, {
        title,
        description,
        priority,
        deadline,
        columnId,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
