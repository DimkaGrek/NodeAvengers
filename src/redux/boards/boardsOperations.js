import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/api';

export const getBoards = createAsyncThunk(
  'boards/getBoards',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get('/board');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addBoard = createAsyncThunk(
  'boards/addBoard',
  async (board, thunkAPI) => {
    try {
      const { data } = await api.post(`/board`, board);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getBoard = createAsyncThunk(
  'boards/getBoard',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/board/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editBoard = createAsyncThunk(
  'boards/editBoard',
  async ({ _id, name, columns, userId, icon, backgroundImage }, thunkAPI) => {
    try {
      const { data } = await api.put(`/board/${_id}`, {
        _id,
        name,
        columns,
        userId,
        icon,
        backgroundImage,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boads/deleteBoard',
  async (id, thunkAPI) => {
    try {
      await api.delete(`/board/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
