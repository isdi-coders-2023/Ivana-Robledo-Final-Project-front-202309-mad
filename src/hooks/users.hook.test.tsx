import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LoginUser, User } from '../entities/user';
import { useUsers } from './users.hook';
import { appStore } from '../store/store';
import { Provider, useDispatch } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { ApiRepoUsers } from '../services/api.repo.users';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

const mockLoginUser = {} as LoginUser;
const mockNewUser = {} as Partial<User>;
describe('Given user Hook', () => {
  global.window = Object.create(window);
  const { location } = window;
  (global.window as any).location = { ...location, reload: jest.fn() };
  const TestComponents = () => {
    const { login, logout, register } = useUsers();

    return (
      <>
        <button onClick={() => logout()}></button>
        <button onClick={() => login(mockLoginUser)}></button>
        <button onClick={() => register(mockNewUser)}></button>
      </>
    );
  };

  let elements: HTMLElement[];

  beforeEach(() => {
    render(
      <Provider store={appStore}>
        <TestComponents></TestComponents>
      </Provider>
    );
    elements = screen.getAllByRole('button');
  });

  describe('When an user logout', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[0]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When an user login', () => {
    test('Then the dispatch should have been called', async () => {
      await userEvent.click(elements[1]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });

  describe('When an user register', () => {
    test('Then the dispatch should have been called', async () => {
      ApiRepoUsers.prototype.register = jest.fn();
      await userEvent.click(elements[2]);
      expect(useDispatch()).toHaveBeenCalled();
    });
  });
});
