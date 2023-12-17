import { ApiRepoRecipes } from './api.repo.recipes.js';

describe('Given ApiRepoRecipes', () => {
  const repo = new ApiRepoRecipes('');
  describe('When we instantiate it and response is ok', () => {
    let jsonMock: jest.Mock;
    beforeEach(() => {
      jsonMock = jest.fn().mockResolvedValue({});
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: true,
        json: jsonMock,
      });
    });

    test('Then the method createRecipe should be used', async () => {
      const result = await repo.createRecipe({} as FormData);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });

    test('Then the method updateRecipe should be used', async () => {
      const result = await repo.updateRecipe('', {} as FormData);
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });

    test('Then the method getAllRecipes should be used', async () => {
      const result = await repo.getAllRecipes();
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });

    test('Then the method getRecipeById should be used', async () => {
      const result = await repo.getRecipeById('');
      expect(jsonMock).toHaveBeenCalled();
      expect(result).toStrictEqual({});
    });
  });

  describe('When we instantiate it and response is not ok', () => {
    const errorStatus = 404;
    const errorStatusText = 'Not Found';
    const token = '';
    beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValueOnce({
        ok: false,
        status: errorStatus,
        statusText: errorStatusText,
      });
    });

    const repo = new ApiRepoRecipes(token);

    test('Then the method createRecipe should throw an error', async () => {
      await expect(repo.createRecipe({} as FormData)).rejects.toThrow();
    });

    test('Then the method updateRecipe should throw an error', async () => {
      await expect(repo.updateRecipe('', {} as FormData)).rejects.toThrow();
    });

    test('Then the method deleteRecipe should throw an error', async () => {
      await expect(repo.deleteRecipe('')).rejects.toThrow();
    });

    test('Then the method getAllRecipes should throw an error', async () => {
      await expect(repo.getAllRecipes()).rejects.toThrow();
    });

    test('Then the method getRecipeById should throw an error', async () => {
      await expect(repo.getRecipeById('')).rejects.toThrow();
    });
  });
});
