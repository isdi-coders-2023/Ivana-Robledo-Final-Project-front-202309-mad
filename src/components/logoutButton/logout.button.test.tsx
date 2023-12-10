import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { useUsers } from '../../hooks/users.hook';
import { LogoutButton } from './logout.button';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/users.hook', () => ({
  useUsers: jest.fn().mockReturnValue({
    logout: jest.fn(),
    loggedUser: { name: 'Pepe' },
  }),
}));

describe('Given LogoutButton component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Provider store={appStore}>
          <LogoutButton />
        </Provider>
      </Router>
    );
  });

  describe('When click on it', () => {
    test('Then it should render logout button and triggers logout function on click', async () => {
      const logoutButton = screen.getByRole('button');
      expect(logoutButton).toBeInTheDocument();
      await userEvent.click(logoutButton);
      expect(useUsers().logout).toHaveBeenCalled();
    });
  });
});
