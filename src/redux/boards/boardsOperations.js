import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const getBoards = createAsyncThunk(
  'boards/getBoards',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/board/');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBoard = createAsyncThunk(
  'boards/getBoard',
  async (_id, thunkAPI) => {
    try {
      const { data } = await api.get(`/board/${_id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBoard = createAsyncThunk(
  'boards/editBoard',
  async ({ _id, name, columns, userId }, thunkAPI) => {
    try {
      const { data } = await api.put(`/board/${_id}`, {
        _id,
        name,
        columns,
        userId,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
