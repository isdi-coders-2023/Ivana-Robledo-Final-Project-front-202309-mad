import { LoginUser, User } from '../entities/user';
import { ApiRepoUsers } from '../services/api.repo.users';
import { appStore } from '../store/store';
import { LoginResponse } from '../types/login.response';
import { loginThunk, logoutThunk, registerThunk } from './users.thunk';

describe('Given loginThunk', () => {
  const mockedRepo = {
    login: jest.fn().mockReturnValue({} as LoginResponse),
    register: jest.fn().mockReturnValue({} as User),
  } as unknown as ApiRepoUsers;

  describe('When we dispatch succesfully', () => {
    test('Then it should dispatch', async () => {
      await appStore.dispatch(
        loginThunk({ repo: mockedRepo, loginUser: {} as LoginUser })
      );
      expect(mockedRepo.login).toHaveBeenCalled();
    });
    test('Then it should dispatch', async () => {
      await appStore.dispatch(
        registerThunk({ repo: mockedRepo, registerUser: {} as Partial<User> })
      );
      expect(mockedRepo.register).toHaveBeenCalled();
    });
    test('logoutThunk should dispatch', async () => {
      await appStore.dispatch(logoutThunk());
      expect(appStore.getState().UsersState.loggedUser).toBeNull();
    });
  });
});
