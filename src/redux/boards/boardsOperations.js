import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const getBoards = createAsyncThunk(
  'boards/getBoards',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/board/');
      console.log('REQUEST', data);
      return data;
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
