import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { ApiRepoRecipes } from '../services/api.repo.recipes';
import {
  createRecipeThunk,
  deleteRecipeThunk,
  loadOneRecipeThunk,
  loadRecipesThunk,
  updateRecipeThunk,
} from '../slice/recipes.thunk';
import { setCurrentRecipeItem } from '../slice/recipes.slice';
import { Recipe } from '../entities/recipe';

export function useRecipes() {
  const dispatch = useDispatch<AppDispatch>();

  const { token } = useSelector((state: RootState) => state.UsersState);

  const recipesRepo = new ApiRepoRecipes(token!);

  const handleDetailsPage = async (recipeItem: Recipe) => {
    dispatch(setCurrentRecipeItem(recipeItem));
  };

  const loadAllRecipes = () => {
    dispatch(loadRecipesThunk(recipesRepo));
  };

  const loadOneRecipe = (id: string) => {
    dispatch(loadOneRecipeThunk({ repo: recipesRepo, id }));
  };

  const deleteRecipe = (id: string) => {
    dispatch(deleteRecipeThunk({ repo: recipesRepo, id }));
  };

  const createRecipe = (newRecipe: FormData) => {
    dispatch(createRecipeThunk({ repo: recipesRepo, recipeToAdd: newRecipe }));
  };

  const updateCurrentRecipe = (id: string, recipeToUpdate: FormData) => {
    dispatch(updateRecipeThunk({ repo: recipesRepo, id, recipeToUpdate }));
  };

  return {
    loadAllRecipes,
    loadOneRecipe,
    deleteRecipe,
    createRecipe,
    updateCurrentRecipe,
    handleDetailsPage,
  };
}
