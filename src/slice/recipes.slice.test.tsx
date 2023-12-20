import { configureStore } from '@reduxjs/toolkit';
import { Recipe } from '../entities/recipe';
import recipesReducer, {
  setCurrentRecipeItem,
  RecipesState,
} from './recipes.slice';
import { deleteRecipeThunk } from './recipes.thunk';
import { ApiRepoRecipes } from '../services/api.repo.recipes';
describe('Given recipes slice', (): void => {
  jest.mock('../services/api.repo.recipes', () =>
    jest.fn().mockImplementation(() => ({
      apiUrl: 'mockApiUrl',
      token: 'mockToken',
      createRecipe: jest
        .fn()
        .mockResolvedValue({ id: '1', name: 'Mock Recipe' }),
      updateRecipe: jest
        .fn()
        .mockResolvedValue({ id: '1', name: 'Updated Mock Recipe' }),
      deleteRecipe: jest.fn().mockResolvedValue('1'),
    }))
  );

  describe('When recipes reducer setCurrentRecipeItem', () => {
    const initialState: RecipesState = {
      currentRecipe: null,
      recipes: [],
      recipeState: 'idle',
      recipeUpdateState: 'idle',
      recipeDeleteState: 'idle',
    };

    test('should handle deleteRecipeThunk.pending', async () => {
      const store = configureStore({ reducer: recipesReducer });
      const mockRepo = new (ApiRepoRecipes as jest.Mock<ApiRepoRecipes>)(
        'mockToken'
      );
      await store.dispatch(deleteRecipeThunk({ repo: mockRepo, id: '1' }));
      const state = store.getState();
      expect(state.recipeDeleteState).toEqual('loading');
    });

    test('finds the index of the recipe with the given id', () => {
      const initialState = {
        recipes: [
          { id: '1', recipeName: 'Recipe 1' },
          { id: '2', recipeName: 'Recipe 2' },
          { id: '3', recipeName: 'Recipe 3' },
        ],
        currentRecipe: null,
        recipeState: 'idle',
        recipeUpdateState: 'idle',
        recipeDeleteState: 'idle',
      } as RecipesState;
      const recipeIdToDelete = '-1';
      const mockRepo = new (ApiRepoRecipes as jest.Mock<ApiRepoRecipes>)(
        'mockToken'
      );

      const nextState = recipesReducer(
        initialState,
        deleteRecipeThunk.pending(recipeIdToDelete, {
          repo: mockRepo,
          id: recipeIdToDelete,
        })
      );

      const index = nextState.recipes.findIndex(
        (item) => item.id === recipeIdToDelete
      );
      expect(index).toBe(-1);
    });

    test('should handle setCurrentRecipeItem', () => {
      const actual = recipesReducer(
        initialState,
        setCurrentRecipeItem({ id: '1' } as unknown as Recipe)
      );
      expect(actual.currentRecipe).toEqual({ id: '1' });
    });
  });

  describe('recipes actions', () => {
    it('should create an action for setCurrentRecipeItem', () => {
      const payload = { id: '1' } as unknown as Recipe;
      const expectedAction = {
        type: setCurrentRecipeItem.type,
        payload,
      };
      expect(setCurrentRecipeItem(payload)).toEqual(expectedAction);
    });
  });
});
