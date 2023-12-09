import { LoginUser, User } from '../entities/user';
import { ApiRepoUsers } from '../services/api.repo.users';
import { useUsers } from './users.hook';
import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
const mockRepo = {
  register: jest.fn().mockResolvedValue({}),
} as unknown as ApiRepoUsers;
describe('Given useUsers hook', () => {
  describe('when we execute login', () => {
    test('then dispatch should be called ', () => {
      const dispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(dispatch);

      const { result } = renderHook(() => useUsers());

      const { login } = result.current;

      login({} as LoginUser);

      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('when we execute register', () => {
    test.only('then dispatch should be called ', () => {
      const dispatch = jest.fn();
      (useDispatch as jest.Mock).mockReturnValue(dispatch);

      const { result } = renderHook(() => useUsers());

      const { register } = result.current;

      register({} as Partial<User>);
      expect(mockRepo.register).toHaveBeenCalledWith({} as Partial<User>);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
