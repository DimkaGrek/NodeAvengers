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
