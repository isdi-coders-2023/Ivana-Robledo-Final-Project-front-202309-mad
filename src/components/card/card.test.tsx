import { render, screen } from '@testing-library/react';
import { Card } from './card';
import '@testing-library/jest-dom';
import { Recipe } from '../../entities/recipe';
<<<<<<< HEAD
=======
import { BrowserRouter as Router } from 'react-router-dom';

>>>>>>> 4403ecae12dad5076282db86cf50e9ea1aff32ca
const mockRecipe = {
  id: '1',
  recipeName: 'Test Recipe',
  img: { url: 'http://test.com' },
<<<<<<< HEAD
} as unknown as Recipe;
=======
} as Recipe;
>>>>>>> 4403ecae12dad5076282db86cf50e9ea1aff32ca

jest.mock('../../hooks/recipes.hook', () => ({
  useRecipes: () => ({ handleDetailsPage: jest.fn() }),
}));

describe('Card', () => {
  test('renders Card component', () => {
<<<<<<< HEAD
    render(<Card recipe={mockRecipe} />);
=======
    render(
      <Router>
        <Card recipe={mockRecipe} />
      </Router>
    );
>>>>>>> 4403ecae12dad5076282db86cf50e9ea1aff32ca
    expect(screen.getByText('Show Details')).toBeInTheDocument();
  });
});
