import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Recipe } from '../entities/recipe';
import {
  createRecipeThunk,
  deleteRecipeThunk,
  loadOneRecipeThunk,
  loadRecipesThunk,
} from './recipes.thunk';

export type RecipesState = {
  currentRecipe: Recipe | null;
  recipes: Recipe[];
  recipeState: 'idle' | 'loading' | 'loaded' | 'error';
  recipeDeleteState: 'idle' | 'loading';
  recipeFilter: 'Mis recetas' | 'Galletas' | 'Tortas' | 'Todas las recetas';
};

const initialState: RecipesState = {
  currentRecipe: null,
  recipes: [],
  recipeState: 'idle',
  recipeDeleteState: 'idle',
  recipeFilter: 'Todas las recetas',
};

export const recipesSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadRecipesThunk.pending, (state: RecipesState) => {
      state.recipeState = 'loading';
      return state;
    });

    builder.addCase(
      loadRecipesThunk.fulfilled,
      (state: RecipesState, { payload }: PayloadAction<Recipe[]>) => {
        state.recipeState = 'loaded';
        state.recipes = payload;
        return state;
      }
    );

    builder.addCase(loadRecipesThunk.rejected, (state: RecipesState) => {
      state.recipeState = 'error';
      return state;
    });

    builder.addCase(loadOneRecipeThunk.pending, (state: RecipesState) => {
      state.recipeState = 'loading';
      return state;
    });

    builder.addCase(
      loadOneRecipeThunk.fulfilled,
      (state: RecipesState, { payload }: PayloadAction<Recipe>) => {
        state.recipeState = 'loaded';
        state.currentRecipe = payload;
        return state;
      }
    );

    builder.addCase(loadOneRecipeThunk.rejected, (state: RecipesState) => {
      state.recipeState = 'error';
      return state;
    });

    builder.addCase(deleteRecipeThunk.fulfilled, (state: RecipesState) => {
      state.recipeDeleteState = 'idle';
    });

    builder.addCase(deleteRecipeThunk.pending, (state: RecipesState) => {
      state.recipeDeleteState = 'loading';
    });

    builder.addCase(
      createRecipeThunk.fulfilled,
      (state: RecipesState, { payload }) => ({
        ...state,
        recipes: [...state.recipes, payload],
      })
    );
  },
});

export default recipesSlice.reducer;
