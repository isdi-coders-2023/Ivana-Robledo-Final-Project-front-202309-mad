import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../entities/user';
import { LoginResponse } from '../types/login.response';
import { loginThunk, loginTokenThunk } from './users.thunk';

type LoginState = 'idle' | 'logging' | 'error';

type UsersState = {
  loggedUser: User | null;
  loginState: LoginState;
  token: string;
};

const initialState: UsersState = {
  loggedUser: null,
  loginState: 'idle',
  token: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state: UsersState) {
      state.loggedUser = null;
      state.token = '';

      return state;
    },
  },
  // eslint-disable-next-line object-shorthand
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state: UsersState) => {
      state.loginState = 'logging';
    });

    builder.addCase(loginThunk.rejected, (state: UsersState) => {
      state.loginState = 'error';
    });

    builder.addCase(
      loginThunk.fulfilled,
      (state: UsersState, { payload }: PayloadAction<LoginResponse>) => {
        state.loggedUser = payload.user;
        state.token = payload.token;
      }
    );

    builder.addCase(
      loginTokenThunk.fulfilled,
      (state: UsersState, { payload }: PayloadAction<LoginResponse>) => {
        state.loggedUser = payload.user;
        state.token = payload.token;
      }
    );
  },
});
export const ac = usersSlice.actions;
export default usersSlice.reducer;
