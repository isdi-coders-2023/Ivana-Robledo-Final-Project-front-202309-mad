import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { useRecipes } from './recipes.hook';
import { Recipe } from '../entities/recipe';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockReturnValue({ token: 'test' }),
}));

describe('Given useRecipes hook...', () => {
  const dispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatch);

  describe('When loadRecipes component is called', () => {
    test('Then it should dispatch', async () => {
      const { result } = renderHook(() => useRecipes());
      const { loadAllRecipes } = result.current;

      loadAllRecipes();
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('When createRecipe component is called', () => {
    test('Then it should dispatch', async () => {
      const { result } = renderHook(() => useRecipes());
      const { createRecipe } = result.current;

      createRecipe({} as FormData);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('When deleteRecipe component is called', () => {
    test('Then it should dispatch', async () => {
      const { result } = renderHook(() => useRecipes());
      const { deleteRecipe } = result.current;

      deleteRecipe({} as Recipe['id']);
      expect(dispatch).toHaveBeenCalled();
    });
  });

  describe('When deleteRecipe component is called', () => {
    test('Then it should dispatch', async () => {
      const { result } = renderHook(() => useRecipes());
      const { handleDetailsPage } = result.current;

      await handleDetailsPage({} as Recipe);
      expect(dispatch).toHaveBeenCalled();
    });
  });
});
