import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const addColumn = createAsyncThunk(
  'column/addColumn',
  async (column, thunkAPI) => {
    try {
      const { data } = await api.post('/colum', column);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const editColumn = createAsyncThunk(
  'column/editColumn',
  async ({ id, name }, thunkAPI) => {
    try {
      const { data } = await api.put(`/colum/${id}`, {
        name,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'column/deleteColumn',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/colum/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
