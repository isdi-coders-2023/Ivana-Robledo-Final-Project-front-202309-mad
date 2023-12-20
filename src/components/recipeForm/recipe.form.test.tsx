import { render, screen } from '@testing-library/react';
import RecipeForm from './recipe.form';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { appStore } from '../../store/store';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RecipeForm', () => {
  test('renders RecipeForm component', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Crear')).toBeInTheDocument();
  });
});
