import { UsersState } from './users.slice';
import usersSlice, { setToken, clearToken, logout } from '../slice/users.slice';
import { User } from '../entities/user';

describe('Given userSlice', () => {
  describe('When we call slice with logout action', () => {
    test('then it should set loggedUser to null and token to null', () => {
      const currentState: UsersState = {
        loggedUser: {} as User,
        loginLoadState: 'idle',
        token: 'someToken',
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
      };

      const newState = usersSlice(currentState, clearToken());

      expect(newState.token).toBe(null);
    });
  });
  describe('When we call slice and it is rejected', () => {
    test('Then if loginLoadState is error it should set loggedUser to null and token to null', (): void => {
      const currentState: UsersState = {
        loggedUser: {} as User,
        loginLoadState: 'error',
        token: 'someToken',
      };

      const newState = usersSlice(currentState, logout());

      expect(newState.loggedUser).toBe(null);
      expect(newState.token).toBe(null);
    });
  });
});
