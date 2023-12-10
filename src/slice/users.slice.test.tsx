import { UsersState } from './users.slice';
import usersSlice, { setToken, clearToken, logout } from '../slice/users.slice';
import { LoginUser, User } from '../entities/user';
import { loginThunk, registerThunk } from './users.thunk';
import { ApiRepoUsers } from '../services/api.repo.users';

describe('Given userSlice', () => {
  describe('When we call slice with logout action', () => {
    test('then it should set loggedUser to null and token to null', () => {
      const currentState: UsersState = {
        loggedUser: {} as User,
        loginLoadState: 'idle',
        token: 'someToken',
        registrationStatus: 'registered',
      };

      const newState = usersSlice(currentState, logout());

      expect(newState.loggedUser).toBe(null);
      expect(newState.token).toBe(null);
    });
  });

  describe('When we call slice with setToken action', () => {
    test('then it should set token to the provided value', () => {
      const currentState: UsersState = {
        loggedUser: {} as User,
        loginLoadState: 'idle',
        token: '',
        registrationStatus: 'registered',
      };

      const newToken = 'newToken';
      const newState = usersSlice(currentState, setToken(newToken));

      expect(newState.token).toBe(newToken);
    });
  });

  describe('When we call slice with clearToken action', () => {
    test('then it should set token to null', () => {
      const currentState: UsersState = {
        loggedUser: {} as User,
        loginLoadState: 'idle',
        token: 'someToken',
        registrationStatus: 'registered',
      };

      const newState = usersSlice(currentState, clearToken());

      expect(newState.token).toBe(null);
    });
  });

  describe('When we call slice and login is pending', () => {
    test('then it should set loginLoadState to logging', () => {
      const currentState: UsersState = {
        loggedUser: {} as User,
        loginLoadState: 'idle',
        token: 'someToken',
        registrationStatus: 'registered',
      };

      const action = loginThunk.pending;

      const newState = usersSlice(currentState, action);

      expect(newState.loginLoadState).toBe('logging');
    });
  });

  describe('When we call slice and login is rejected', () => {
    test('then it should set loggedUser to null and token to null', () => {
      const currentState: UsersState = {
        loggedUser: {} as User,
        loginLoadState: 'idle',
        token: 'someToken',
        registrationStatus: 'registered',
      };

      // Simular la acción loginThunk.rejected
      const error = new Error('Simulated error');
      const action = loginThunk.rejected(error, '', {
        loginUser: {} as LoginUser,
        repo: {} as ApiRepoUsers,
      });

      const newState = usersSlice(currentState, action);

      expect(newState.loggedUser).toBe(null);
      expect(newState.token).toBe(null);
      expect(newState.loginLoadState).toBe('error');
    });
  });
  describe('When we call slice and login is fulfilled', () => {
    test('then it should set loggedUser and token based on the action payload', () => {
      const currentState: UsersState = {
        loggedUser: null,
        loginLoadState: 'idle',
        token: '',
        registrationStatus: 'registered',
      };

      const user = {} as User;
      const token = 'someToken';
      const action = loginThunk.fulfilled({ user, token }, '', {
        loginUser: {} as LoginUser,
        repo: {} as ApiRepoUsers,
      });

      const newState = usersSlice(currentState, action);

      expect(newState.loggedUser).toEqual(user);
      expect(newState.token).toBe(token);
      expect(newState.loginLoadState).toBe('idle');
    });
  });
  describe('When we call slice with logout action', () => {
    test('then it should set loggedUser to null and token to null', () => {
      const currentState: UsersState = {
        loggedUser: {} as User,
        loginLoadState: 'idle',
        token: 'someToken',
        registrationStatus: 'registered',
      };

      const newState = usersSlice(currentState, logout());

      expect(newState.loggedUser).toBe(null);
      expect(newState.token).toBe(null);
    });
  });
  describe('When we call slice and register is fulfilled', () => {
    test('then it should update registration status', () => {
      const currentState: UsersState = {
        loggedUser: {} as User,
        loginLoadState: 'idle',
        token: 'someToken',
        registrationStatus: 'registered',
      };

      // Simular la acción registerThunk.fulfilled
      const action = registerThunk.fulfilled;

      const newState = usersSlice(currentState, action);

      expect(newState.registrationStatus).toBe('registered');
    });
  });
});
