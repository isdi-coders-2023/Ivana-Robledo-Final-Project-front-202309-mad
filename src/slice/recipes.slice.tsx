import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Recipe } from '../entities/recipe';
import {
  createRecipeThunk,
  deleteRecipeThunk,
  loadOneRecipeThunk,
  loadRecipesThunk,
  updateRecipeThunk,
} from './recipes.thunk';

export type RecipesState = {
  currentRecipe: Recipe | null;
  recipes: Recipe[];
  recipeState: 'idle' | 'loading' | 'loaded' | 'error';
  recipeUpdateState: 'idle' | 'loading';
  recipeDeleteState: 'idle' | 'loading' | 'deleted' | 'error';
  recipeFilter: 'Mis recetas' | 'Galletas' | 'Tortas' | 'Todas las recetas';
};

const initialState: RecipesState = {
  currentRecipe: null,
  recipes: [],
  recipeState: 'idle',
  recipeUpdateState: 'idle',
  recipeDeleteState: 'idle',
  recipeFilter: 'Todas las recetas',
};

export const recipesSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setCurrentRecipeItem(
      state: RecipesState,
      { payload }: PayloadAction<Recipe | null>
    ) {
      state.currentRecipe = payload;
      return state;
    },
  },

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

    builder.addCase(
      deleteRecipeThunk.fulfilled,
      (state: RecipesState, { payload }: PayloadAction<Recipe['id']>) => {
        state.recipes.splice(
          state.recipes.findIndex((item) => item.id === payload),
          1
        );
        state.recipeDeleteState = 'deleted';
        return state;
      }
    );
    builder.addCase(deleteRecipeThunk.pending, (state: RecipesState) => {
      state.recipeDeleteState = 'loading';
      return state;
    });

    builder.addCase(deleteRecipeThunk.rejected, (state: RecipesState) => {
      state.recipeState = 'error';
      return state;
    });

    builder.addCase(
      createRecipeThunk.fulfilled,
      (state: RecipesState, { payload }: PayloadAction<Recipe>) => ({
        ...state,
        recipes: [...state.recipes, payload],
      })
    );

    builder.addCase(
      updateRecipeThunk.fulfilled,
      (state: RecipesState, { payload }: PayloadAction<Recipe>) => {
        const findRecipeIndex = state.recipes.findIndex(
          (item) => item.id === payload.id
        );
        if (findRecipeIndex !== -1) {
          // Actualizar la receta en la lista de recetas
          state.recipes[findRecipeIndex] = payload;
          // Actualizar la receta actual si es la misma receta que se ha actualizado
          if (state.currentRecipe && state.currentRecipe.id === payload.id) {
            state.currentRecipe = payload;
          }
        }

        state.recipeUpdateState = 'idle';
        return state;
      }
    );

    builder.addCase(updateRecipeThunk.pending, (state: RecipesState) => {
      state.recipeUpdateState = 'loading';
      return state;
    });
  },
});

export default recipesSlice.reducer;
export const { setCurrentRecipeItem } = recipesSlice.actions;
