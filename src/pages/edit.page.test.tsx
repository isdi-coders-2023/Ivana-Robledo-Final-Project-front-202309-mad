import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import EditPage from './edit.page';

jest.mock('../hooks/recipes.hook');

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useParams: () => ({ id: '1' }),
  useNavigate: () => jest.fn(),
}));

const mockedRecipes = [
  { id: '1', recipeName: 'torta 1 ' },
  { id: '2', recipeName: 'torta 2' },
  { id: '3', recipeName: 'torta 3' },
];

const updateCurrentRecipeMock = jest.fn();

jest.mock('../hooks/recipes.hook', () => ({
  useRecipes: () => ({
    recipes: mockedRecipes,
    loadAllRecipes: jest.fn(),
    updateCurrentRecipe: updateCurrentRecipeMock,
  }),
}));

describe('EditPage', () => {
  it('updates the recipe on form submission', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <EditPage />
      </MemoryRouter>
    );

    const submitButton = getByRole('button', { name: /crear/i });

    userEvent.click(submitButton);

    const formElement = getByRole('form'); // Obtener la referencia al formulario

    fireEvent.submit(formElement); // Utilizar fireEvent.submit en lugar de userEvent.submit

    expect(updateCurrentRecipeMock).toHaveBeenCalled();
  });
});

/* Import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { EditPage } from './edit.page';

jest.mock('../hooks/recipes.hook', () => ({
  useRecipes: () => ({
    recipes: [{ id: '1', recipeName: 'Test Recipe' }],
    updateCurrentRecipe: jest.fn(),
  }),
}));

describe('EditPage', () => {
  it('updates the recipe on form submission', () => {
    const { getByRole, getByLabelText } = render(
      <MemoryRouter>
        <EditPage />
      </MemoryRouter>
    );
    const input = getByLabelText(/test/i);
    const submitButton = getByRole('button', { name: /submit/i });

    userEvent.type(input, 'Updated Recipe');
    userEvent.click(submitButton);

    expect(
      jest.requireMock('../../hooks/recipes.hook').useRecipes()
        .updateCurrentRecipe
    ).toHaveBeenCalledWith('1', expect.any(FormData));
  });
}); */
