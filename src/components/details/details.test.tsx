import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { appStore } from '../../store/store';
import { BrowserRouter } from 'react-router-dom';
import { Details } from './details';

jest.mock('../../hooks/users.hook', () => ({
  useUsers: jest.fn(),
}));

jest.mock('../../hooks/recipes.hook', () => ({
  useRecipes: jest.fn().mockReturnValue({
    currentRecipe: {
      recipeName: 'test',
      img: 'test',
    },
  }),
}));

describe('Details Component', () => {
  test('renders details correctly', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <Details />
        </BrowserRouter>
      </Provider>
    );

    const result = screen.getByTestId('paragraph');
    expect(result).toBeInTheDocument();
  });
});
