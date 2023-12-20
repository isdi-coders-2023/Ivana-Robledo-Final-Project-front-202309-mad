import { render, screen } from '@testing-library/react';
import { Card } from './card';
import '@testing-library/jest-dom';
import { Recipe } from '../../entities/recipe';
const mockRecipe = {
  id: '1',
  recipeName: 'Test Recipe',
  img: { url: 'http://test.com' },
} as unknown as Recipe;

jest.mock('../../hooks/recipes.hook', () => ({
  useRecipes: () => ({ handleDetailsPage: jest.fn() }),
}));

describe('Card', () => {
  test('renders Card component', () => {
    render(<Card recipe={mockRecipe} />);
    expect(screen.getByText('Show Details')).toBeInTheDocument();
  });
});
