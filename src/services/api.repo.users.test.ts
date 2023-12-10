import { LoginUser, User } from '../entities/user.js';
import { ApiRepoUsers } from './api.repo.users.js';

describe('Given ApiRepoClass', () => {
  describe('When we instantiate it and response is ok', () => {
    let jsonMock: jest.Mock;
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({});
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });

    const repo = new ApiRepoUsers();

    test('Then the method userLogin should be used', async () => {
      const result = await repo.login({} as LoginUser);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });

    test('Then the method userRegister should be used', async () => {
      const result = await repo.register({} as User);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });
    test('Then the method getUsers should be used', async () => {
      await repo.getUsers();
      expect(jsonMock).toHaveBeenCalled();
    });
  });
});

describe('When we instantiate it and response is not ok', () => {
  const errorStatus = 404;
  const errorStatusText = 'Not Found';

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: errorStatus,
      statusText: errorStatusText,
    });
  });

  const repo = new ApiRepoUsers();

  test('Then the method userLogin should throw an error', async () => {
    await expect(repo.login({} as User)).rejects.toThrow();
  });

  test('Then the method userLogin should throw an error', async () => {
    await expect(repo.register({} as Partial<User>)).rejects.toThrow();
  });
  test('Then the method getUsers should throw an error', async () => {
    await expect(repo.getUsers()).rejects.toThrow();
  });
});
