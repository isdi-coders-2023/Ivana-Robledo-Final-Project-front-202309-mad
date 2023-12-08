import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../slice/users.slice';

export const appStore = configureStore({
  reducer: {
    UsersState: usersReducer,
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
