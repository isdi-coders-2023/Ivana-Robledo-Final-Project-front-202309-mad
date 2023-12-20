import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { appStore } from '../store/store';
import '@testing-library/jest-dom';
import MyRecipesPage from './my.recipes';

describe('MyRecipesPage', () => {
  test('renders MyRecipesPage component', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <MyRecipesPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Crea receta')).toBeInTheDocument();
  });
});
