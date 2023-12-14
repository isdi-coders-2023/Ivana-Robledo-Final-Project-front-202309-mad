import { UsersState } from './users.slice';
import usersSlice, { clearToken, logout } from '../slice/users.slice';
import { LoginUser, User } from '../entities/user';
import { loginThunk, registerThunk } from './users.thunk';
import { ApiRepoUsers } from '../services/api.repo.users';

describe('Given userSlice', () => {
  let initialState: UsersState;

  beforeEach(() => {
    initialState = {
      loggedUser: {} as User,
      loginLoadState: 'idle',
      token: 'someToken',
      registrationStatus: 'registered',
    };
  });

  describe('When we call slice with logout action', () => {
    test('then it should set loggedUser to null and token to null', () => {
      const newState = usersSlice(initialState, logout());

      expect(newState.loggedUser).toBe(null);
      expect(newState.token).toBe(null);
    });
  });

  describe('When we call slice with clearToken action', () => {
    test('then it should set token to null', () => {
      const newState = usersSlice(initialState, clearToken());

      expect(newState.token).toBe(null);
    });
  });

  describe('When we call slice and login is pending', () => {
    test('then it should set loginLoadState to logging', () => {
      const action = loginThunk.pending;
      const newState = usersSlice(initialState, action);

      expect(newState.loginLoadState).toBe('logging');
    });
  });

  describe('When we call slice and login is rejected', () => {
    test('then it should set loggedUser to null and token to null', () => {
      const error = new Error('Simulated error');
      const action = loginThunk.rejected(error, '', {
        loginUser: {} as LoginUser,
        repo: {} as ApiRepoUsers,
      });

      const newState = usersSlice(initialState, action);

      expect(newState.loggedUser).toBe(null);
      expect(newState.token).toBe(null);
      expect(newState.loginLoadState).toBe('error');
    });
  });

  describe('When we call slice and login is fulfilled', () => {
    test('then it should set loggedUser and token based on the action payload', () => {
      const user = {} as User;
      const token = 'someToken';
      const action = loginThunk.fulfilled({ user, token }, '', {
        loginUser: {} as LoginUser,
        repo: {} as ApiRepoUsers,
      });

      const newState = usersSlice(initialState, action);

      expect(newState.loggedUser).toEqual(user);
      expect(newState.token).toBe(token);
      expect(newState.loginLoadState).toBe('logged');
    });
  });

  describe('When we call slice with logout action', () => {
    test('then it should set loggedUser to null and token to null', () => {
      const newState = usersSlice(initialState, logout());

      expect(newState.loggedUser).toBe(null);
      expect(newState.token).toBe(null);
    });
  });

  describe('When we call slice and register is fulfilled', () => {
    test('then it should update registration status', () => {
      const action = registerThunk.fulfilled;
      const newState = usersSlice(initialState, action);

      expect(newState.registrationStatus).toBe('registered');
    });
  });
});
