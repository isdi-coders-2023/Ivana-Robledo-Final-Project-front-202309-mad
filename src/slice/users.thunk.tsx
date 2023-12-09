import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../types/login.response';
import { User } from '../entities/user';
import { ApiRepoUsers } from '../services/api.repo.users';
import { logout, setToken } from './users.slice';

export const loginThunk = createAsyncThunk<
  LoginResponse,
  { loginUser: Partial<User> /* LoginUser */; repo: ApiRepoUsers }
>('users/login', async ({ loginUser, repo }, { dispatch }) => {
  const loginResponse = await repo.login(loginUser);
  dispatch(setToken(loginResponse.token));
  return loginResponse;
});

export const registerThunk = createAsyncThunk<
  User,
  { repo: ApiRepoUsers; registerUser: Partial<User> }
>('users/register', async ({ repo, registerUser }) => {
  const registerResponse = await repo.register(registerUser);

  return registerResponse;
});

export const logoutThunk = createAsyncThunk(
  'logout',
  async (_, { dispatch }) => {
    dispatch(logout());
    return 'Logout exitoso';
  }
);
