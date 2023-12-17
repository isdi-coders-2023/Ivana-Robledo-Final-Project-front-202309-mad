import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DetailsPage } from '../pages/details.page';
import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from '../slice/recipes.slice';
import { Recipe } from '../entities/recipe';
import '@testing-library/jest-dom';

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
      recipeFilter: 'Todas las recetas',
    },
  },
});

test('should render DetailsPage with recipe details', () => {
  const { getByText } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id">
            <DetailsPage />
          </Route>
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  expect(getByText('Test Recipe')).toBeInTheDocument();
});
