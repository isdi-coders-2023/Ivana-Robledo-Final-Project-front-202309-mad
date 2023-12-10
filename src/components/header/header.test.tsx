import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './header';
import { MemoryRouter as Router } from 'react-router-dom';
import { LogoutButton } from '../logoutButton/logout.button';

jest.mock('../logoutButton/logout.button');

describe('Given Header component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      render(
        <Router>
          <Header />
        </Router>
      );
    });

    test('Then it should be in the document', () => {
      const headerElement = screen.getByRole('banner');
      expect(headerElement).toBeInTheDocument();
      expect(LogoutButton).toHaveBeenCalled();
    });
  });
});
