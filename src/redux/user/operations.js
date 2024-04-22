import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '../../api/api';

export const getUserThunk = createAsyncThunk(
  'getUser',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/users/${id}`);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'updateUser',
  async (credentials, thunkAPI) => {
    const { id, avatarURL, name, email, password, newPassword } = credentials;
    const user = {};

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (newPassword) {
      user.newpassword = newPassword;
    }

    const formData = new FormData();

    if (Object.keys(user).length) {
      formData.append('userData', JSON.stringify(user));
    }

    if (avatarURL) {
      formData.append('avatar', avatarURL);
    }

    try {
      const { data } = await api.put(`/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserThemeThunk = createAsyncThunk(
  'updateUserTheme',
  async (id, thunkAPI) => {
    try {
      const { data } = await api.patch(`/users/${id}/theme`, { themeId: id });

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
