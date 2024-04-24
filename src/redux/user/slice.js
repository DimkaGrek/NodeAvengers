import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { updateUserThemeThunk, updateUserThunk } from './operations';
import { loginThunk, refreshThunk } from '../auth/operations';

const initialState = {
  id: null,
  name: '',
  email: '',
  avatarURL: null,
  themeId: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loginThunk.fulfilled, (state, { payload: { user } }) => {
        state.id = user.id;
        state.name = user.name;
        state.email = user.email;
        state.avatarURL = user.avatarURL;
        state.themeId = user.themeId;
        state.isLoading = false;
      })
      .addCase(refreshThunk.fulfilled, (state, { payload: { user } }) => {
        state.id = user.id;
        state.name = user.name;
        state.email = user.email;
        state.avatarURL = user.avatarURL;
        state.themeId = user.themeId;
        state.isLoading = false;
      })
      .addCase(
        updateUserThunk.fulfilled,
        (state, { payload: { name, email, avatarURL, themeId, errors } }) => {
          state.name = name;
          state.email = email;
          state.avatarURL = avatarURL;
          state.themeId = themeId;
          state.error = errors;
          state.isLoading = false;
        }
      )
      .addCase(updateUserThemeThunk.fulfilled, (state, { payload }) => {
        state.themeId = payload;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          refreshThunk.pending,
          updateUserThunk.pending,
          updateUserThemeThunk.pending
        ),
        state => {
          state.error = null;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          refreshThunk.rejected,
          updateUserThunk.rejected,
          updateUserThemeThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload;
          state.isLoading = false;
        }
      );
  },
  selectors: {
    selectId: state => state.id,
    selectName: state => state.name,
    selectEmail: state => state.email,
    selectAvatarURL: state => state.avatarURL,
    selectThemeId: state => state.themeId,
    selectIsLoading: state => state.isLoading,
    selectError: state => state.error,
  },
});

export const userReducer = slice.reducer;

export const {
  selectId,
  selectName,
  selectEmail,
  selectAvatarURL,
  selectThemeId,
  selectIsLoading,
  selectError,
} = slice.selectors;
