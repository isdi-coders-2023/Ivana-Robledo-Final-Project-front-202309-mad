import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse } from '../types/login.response';
import { LoginUser, User } from '../entities/user';
import { ApiRepoUsers } from '../services/api.repo.users';
import { logout } from './users.slice';

export const loginThunk = createAsyncThunk<
  LoginResponse,
  { loginUser: LoginUser; repo: ApiRepoUsers }
>('users/login', async ({ loginUser, repo }) => {
  const loginResponse = await repo.login(loginUser);

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
