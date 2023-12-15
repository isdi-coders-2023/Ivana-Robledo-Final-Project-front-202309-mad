import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRepoRecipes } from '../services/api.repo.recipes.ts';
import { Recipe } from '../entities/recipe.ts';

export const loadRecipesThunk = createAsyncThunk<Recipe[], ApiRepoRecipes>(
  'recipes/load',
  async (repo) => {
    const recipes = await repo.getAllRecipes();
    return recipes;
  }
);

export const loadOneRecipeThunk = createAsyncThunk<
  Recipe,
  { repo: ApiRepoRecipes; id: Recipe['id'] }
>('recipe/load', async ({ repo, id }) => {
  const recipe = await repo.getRecipeById(id);
  return recipe;
});

export const createRecipeThunk = createAsyncThunk<
  Recipe,
  { repo: ApiRepoRecipes; recipeToAdd: FormData }
>('recipes/create', async ({ repo, recipeToAdd }) => {
  const createRecipe = await repo.createRecipe(recipeToAdd);
  return createRecipe;
});

export const updateRecipeThunk = createAsyncThunk<
  Recipe,
  { repo: ApiRepoRecipes; id: Recipe['id']; recipeToUpdate: FormData }
>('recipes/update', async ({ repo, id, recipeToUpdate }) => {
  const updateRecipe = await repo.updateRecipe(id, recipeToUpdate);
  return updateRecipe;
});

export const deleteRecipeThunk = createAsyncThunk<
  Recipe['id'],
  { repo: ApiRepoRecipes; id: Recipe['id'] }
>('delete', async ({ repo, id }) => {
  await repo.deleteRecipe(id);
  return id;
});
