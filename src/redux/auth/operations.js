import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, clearToken, setToken } from '../../api/api';
import { getThemesList } from '../themes/operations';

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
      const response = await api.post('/auth/login', credentials);
      setToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      if (error.request.status === 401) {
        return thunkAPI.rejectWithValue(
          "Email doesn't exist or password is incorrect. Please try again."
        );
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const verifyLoginThunk = createAsyncThunk(
  'verifyLogin',
  async (token, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/verifyLogin', { token });
      setToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk('refresh', async (_, thunkAPI) => {
  const { auth } = thunkAPI.getState();

  const refreshToken = auth.refreshToken;

  if (!refreshToken) {
    return thunkAPI.rejectWithValue('No refresh token.');
  }

  try {
    const { data } = await api.post('/auth/refresh', { refreshToken });

    setToken(data.accessToken);
    await thunkAPI.dispatch(getThemesList());
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logoutThunk = createAsyncThunk(
  'logout',
  async (refreshToken, thunkAPI) => {
    try {
      await api.post('/auth/logout', refreshToken);
      clearToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resendEmailThunk = createAsyncThunk(
  'resendEmail',
  async (credentials, thunkAPI) => {
    try {
      await api.post('/auth/resendEmail', credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'sendCode',
  async (email, thunkAPI) => {
    try {
      const result = await api.post('/auth/resendPassword', email);
      return result.data.message;
    } catch (error) {
      let err;
      // eslint-disable-next-line no-prototype-builtins
      if (error.hasOwnProperty('response')) err = error.response.data.message;
      else err = error.message;
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const verifyResendPassword = createAsyncThunk(
  'changePassword',
  async (data, thunkAPI) => {
    try {
      const result = await api.patch('/auth/verifyResendPassword', data);
      return result.data.message;
    } catch (error) {
      let err;
      // eslint-disable-next-line no-prototype-builtins
      if (error.hasOwnProperty('response')) err = error.response.data.message;
      else err = error.message;
      return thunkAPI.rejectWithValue(err);
    }
  }
);
