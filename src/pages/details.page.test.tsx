import { render } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DetailsPage } from '../pages/details.page';
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../slice/recipes.slice';
import { Recipe } from '../entities/recipe';
import '@testing-library/jest-dom';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
  preloadedState: {
    recipes: {
      currentRecipe: null,
      recipes: [{ id: '1', recipeName: 'Test Recipe' } as unknown as Recipe],
      recipeState: 'idle',
      recipeUpdateState: 'idle',
      recipeDeleteState: 'idle',
    },
  },
});

test('should render DetailsPage with recipe details', () => {
  (useSelector as jest.Mock).mockImplementation(() => ({
    recipes: [{ id: '1', recipeName: 'Test Recipe' } as unknown as Recipe],
    currentRecipe: {
      id: '1',
      recipeName: 'Test Recipe',
      img: { url: 'test-url' },
    } as unknown as Recipe,
  }));
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(getByText('Test Recipe')).toBeInTheDocument();
});
