import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Recipe } from '../../entities/recipe';
import { List } from './list';

const mockRecipes = [
  {
    id: '1',
    recipeName: 'Test Recipe 1',
    img: { url: 'http://test1.com' },
    // Add other properties as needed
  },
  {
    id: '2',
    recipeName: 'Test Recipe 2',
    img: { url: 'http://test2.com' },
    // Add other properties as needed
  },
] as unknown as Recipe[];

jest.mock('../card/card', () => ({
  Card: ({ recipe }: { recipe: Recipe }) => <div>{recipe.recipeName}</div>,
}));

describe('List', () => {
  test('renders List component', () => {
    render(<List recipesToRender={mockRecipes} />);
    mockRecipes.forEach((recipe) => {
      expect(screen.getByText(recipe.recipeName)).toBeInTheDocument();
    });
  });
});
