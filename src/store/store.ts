import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../slice/users.slice';
import recipesReducer from '../slice/recipes.slice';

export const appStore = configureStore({
  reducer: {
    UsersState: usersReducer,
    RecipesState: recipesReducer,
  },
});

export type AppDispatch = typeof appStore.dispatch;

export type RootState = ReturnType<typeof appStore.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
