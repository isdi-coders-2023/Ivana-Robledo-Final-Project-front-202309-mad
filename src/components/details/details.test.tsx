import { render, screen, fireEvent } from '@testing-library/react';
import { useRecipes } from '../../hooks/recipes.hook';
import { Details } from './details';

jest.mock('../hooks/recipes.hook', () => ({
  useRecipes: () => ({
    deleteRecipe: jest.fn(),
    recipeDeleteState: 'idle',
    createRecipe: jest.fn(),
    updateCurrentRecipe: jest.fn(),
    recipeUpdateState: 'idle',
  }),
}));

describe('Details component', () => {
  it('renders correctly', () => {
    render(<Details />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('calls deleteRecipe on delete button click', () => {
    const deleteRecipeMock = jest.fn();

    useRecipes.mockReturnValue({
      deleteRecipe: deleteRecipeMock,
      recipeDeleteState: 'idle',
    });

    render(<Details />);

    fireEvent.click(screen.getByText('Delete'));

    expect(deleteRecipeMock).toHaveBeenCalled();
  });

  it('calls handleUpdate on update button click', () => {
    const handleUpdateMock = jest.fn();

    useRecipes.mockReturnValue({
      deleteRecipe: jest.fn(),
      recipeDeleteState: 'idle',
    });

    render(<Details />);

    fireEvent.click(screen.getByText('Update'));

    expect(handleUpdateMock).toHaveBeenCalled();
  });
});
