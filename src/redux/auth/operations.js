import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setToken } from '../../api/api';

export const registerThunk = createAsyncThunk(
  'register',
  async (credentials, thunkAPI) => {
    try {
      await api.post('/auth/register', credentials);
    } catch (error) {
      if (error.request.status === 409) {
        return thunkAPI.rejectWithValue('Email is already in use.');
      }

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/login', credentials);
      setToken(data.accessToken);
      return data;
    } catch (error) {
      if (error.request.status === 403) {
        return thunkAPI.rejectWithValue(
          "Email doesn't exist or password is incorrect. Please try again."
        );
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const verifyLoginThunk = createAsyncThunk(
  'auth/verifyLogin',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post('auth/verifyLogin', credentials);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
