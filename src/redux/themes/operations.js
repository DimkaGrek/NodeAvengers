import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const getThemesList = createAsyncThunk(
  'themes/getThemesList',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/themes');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
