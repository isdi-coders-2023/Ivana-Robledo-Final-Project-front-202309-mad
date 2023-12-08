import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../types/login.response';
import { LoginUser } from '../entities/user';
import { ApiRepoUsers } from '../services/api.repo.users';
import { logout, setToken } from './users.slice';

export const loginThunk = createAsyncThunk<
  LoginResponse,
  { loginUser: LoginUser; repo: ApiRepoUsers }
>('login', async ({ loginUser, repo }, { dispatch }) => {
  const loginResponse = await repo.login(loginUser);
  dispatch(setToken(loginResponse.token));
  return loginResponse;
});

export const logoutThunk = createAsyncThunk(
  'logout',
  async (_, { dispatch }) => {
    dispatch(logout());
    return 'Logout exitoso';
  }
);
