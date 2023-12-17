import { Recipe } from '../entities/recipe';
import recipesReducer, {
  setCurrentRecipeItem,
  RecipesState,
} from './recipes.slice';
describe('Given recipes slice', (): void => {
  describe('When recipes reducer setCurrentRecipeItem', () => {
    const initialState: RecipesState = {
      currentRecipe: null,
      recipes: [],
      recipeState: 'idle',
      recipeUpdateState: 'idle',
      recipeDeleteState: 'idle',
      recipeFilter: 'Todas las recetas',
    };

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
