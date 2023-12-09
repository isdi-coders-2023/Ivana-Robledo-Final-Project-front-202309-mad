import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../entities/user';

import { loginThunk } from './users.thunk';
import { LoginResponse } from '../types/login.response';

type LoginState = 'idle' | 'logging' | 'error' | 'logout';

export type UsersState = {
  loggedUser: User | null;
  loginLoadState: LoginState;
  token: string | null;
};

const initialState: UsersState = {
  loggedUser: null,
  loginLoadState: 'idle',
  token: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
    logout(state: UsersState) {
      state.loggedUser = null;
      state.token = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(loginThunk.pending, (state: UsersState) => {
      state.loginLoadState = 'logging';
    });
    builder.addCase(loginThunk.rejected, (state: UsersState) => {
      state.loginLoadState = 'error';
      state.loggedUser = null;
      state.token = null;

      return state;
    });
    builder.addCase(
      loginThunk.fulfilled,
      (state: UsersState, { payload }: PayloadAction<LoginResponse>) => {
        state.loggedUser = payload.user;
        state.loginLoadState = 'idle';
        state.token = payload.token;
      }
    );
  },
});

export default usersSlice.reducer;
export const ac = usersSlice.actions;
export const { setToken, clearToken, logout } = usersSlice.actions;
export const { reducer, actions } = usersSlice;
