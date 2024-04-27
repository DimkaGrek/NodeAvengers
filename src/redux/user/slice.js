import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  needHelpThunk,
  updateUserThemeThunk,
  updateUserThunk,
} from './operations';
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  verifyLoginThunk,
} from '../auth/operations';

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
      .addCase(needHelpThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          loginThunk.fulfilled,
          refreshThunk.fulfilled,
          verifyLoginThunk.fulfilled
        ),
        (state, { payload: { user } }) => {
          state.id = user.id;
          state.name = user.name;
          state.email = user.email;
          state.avatarURL = user.avatarURL;
          state.themeId = user.themeId;
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          refreshThunk.pending,
          updateUserThunk.pending,
          updateUserThemeThunk.pending,
          needHelpThunk.pending
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
          updateUserThemeThunk.rejected,
          needHelpThunk.rejected
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
