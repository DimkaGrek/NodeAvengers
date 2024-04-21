import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  loginThunk,
  verifyLoginThunk,
  registerThunk,
  logoutThunk,
  refreshThunk,
} from './operations';

const initialState = {
  id: null,
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(
        loginThunk.fulfilled,
        (state, { payload: { user, accessToken, refreshToken } }) => {
          state.id = user.id;
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.isLoggedIn = true;
        }
      )
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      })
      .addCase(
        verifyLoginThunk.fulfilled,
        (state, { payload: { id, accessToken, refreshToken } }) => {
          state.id = id;
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.isLoggedIn = true;
        }
      )
      .addCase(
        refreshThunk.fulfilled,
        (state, { payload: { user, accessToken, refreshToken } }) => {
          state.id = user.id;
          state.accessToken = accessToken;
          state.refreshToken = refreshToken;
          state.isLoggedIn = true;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.pending,
          loginThunk.pending,
          verifyLoginThunk.pending,
          logoutThunk.pending,
          refreshThunk.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          registerThunk.fulfilled,
          loginThunk.fulfilled,
          verifyLoginThunk.fulfilled,
          logoutThunk.fulfilled,
          refreshThunk.fulfilled
        ),
        state => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          loginThunk.rejected,
          registerThunk.rejected,
          verifyLoginThunk.rejected,
          logoutThunk.rejected,
          refreshThunk.rejected
        ),
        (state, { payload }) => {
          state.error = payload;
          state.isLoading = false;
        }
      );
  },
  selectors: {
    selectId: state => state.id,
    selectAccessToken: state => state.accessToken,
    selectRefreshToken: state => state.refreshToken,
    selectIsLoggedIn: state => state.isLoggedIn,
    selectError: state => state.error,
    selectIsLoading: state => state.isLoading,
  },
});

export const authReducer = slice.reducer;

export const {
  selectId,
  selectAccessToken,
  selectRefreshToken,
  selectIsLoggedIn,
  selectError,
  selectIsLoading,
} = slice.selectors;
