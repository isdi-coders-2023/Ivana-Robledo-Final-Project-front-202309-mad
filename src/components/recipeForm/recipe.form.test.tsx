<<<<<<< HEAD
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import RecipeForm from './recipe.form';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

jest.mock('../../hooks/recipes.hook', () => ({
  useRecipes: () => ({
    createRecipe: jest.fn(),
  }),
}));

describe('RecipeForm', () => {
  test('handles form submission', () => {
    const navigate = useNavigate();
    const { createRecipe } = require('../../hooks/recipes.hook');

=======
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
>>>>>>> 4403ecae12dad5076282db86cf50e9ea1aff32ca
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <RecipeForm />
        </BrowserRouter>
      </Provider>
    );
<<<<<<< HEAD

    const form = document.querySelector('form');
    if (form) {
      fireEvent.submit(form);
    }

    expect(createRecipe).toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/main');
=======
    expect(screen.getByText('Crear')).toBeInTheDocument();
>>>>>>> 4403ecae12dad5076282db86cf50e9ea1aff32ca
  });
});
