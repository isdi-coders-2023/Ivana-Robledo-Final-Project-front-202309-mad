import { Recipe } from '../entities/recipe';
import { ApiRepoRecipes } from '../services/api.repo.recipes';
import { appStore } from '../store/store';
import {
  createRecipeThunk,
  deleteRecipeThunk,
  loadOneRecipeThunk,
  loadRecipesThunk,
  updateRecipeThunk,
} from '../slice/recipes.thunk';

describe('Given loadRecipesThunk', () => {
  describe('When we dispatch succesfully', () => {
    const mockedRepo = {
      getAllRecipes: jest.fn().mockReturnValue([] as Recipe[]),
      getRecipeById: jest.fn().mockReturnValue({} as Recipe),
      deleteRecipe: jest.fn().mockReturnValue([] as Recipe[]),
      createRecipe: jest.fn().mockReturnValue({} as Recipe),
      updateRecipe: jest.fn().mockReturnValue({} as Recipe),
    } as unknown as ApiRepoRecipes;

    test('Then it should dispatch', async () => {
      await appStore.dispatch(loadRecipesThunk(mockedRepo));
      expect(mockedRepo.getAllRecipes).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await appStore.dispatch(loadOneRecipeThunk({ repo: mockedRepo, id: '' }));
      expect(mockedRepo.getRecipeById).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await appStore.dispatch(deleteRecipeThunk({ repo: mockedRepo, id: '' }));
      expect(mockedRepo.deleteRecipe).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await appStore.dispatch(
        createRecipeThunk({ repo: mockedRepo, recipeToAdd: {} as FormData })
      );
      expect(mockedRepo.createRecipe).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await appStore.dispatch(
        updateRecipeThunk({
          repo: mockedRepo,
          id: '',
          recipeToUpdate: {} as FormData,
        })
      );
      expect(mockedRepo.updateRecipe).toHaveBeenCalled();
    });
  });

  describe('When we dispatch unsuccesfully', () => {
    const mockedRepo = {
      getAllRecipes: jest.fn().mockRejectedValue([] as Recipe[]),
      getRecipeById: jest.fn().mockRejectedValue({} as Recipe),
    } as unknown as ApiRepoRecipes;

    test('Then it should dispatch', async () => {
      await appStore.dispatch(loadRecipesThunk(mockedRepo));
      expect(mockedRepo.getAllRecipes).toHaveBeenCalled();
    });

    test('Then it should dispatch', async () => {
      await appStore.dispatch(loadOneRecipeThunk({ repo: mockedRepo, id: '' }));
      expect(mockedRepo.getRecipeById).toHaveBeenCalled();
    });
  });
});
