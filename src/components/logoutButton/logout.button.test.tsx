import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';

import { LogoutButton } from './logout.button';
import userEvent from '@testing-library/user-event';
import { useUsers } from '../../hooks/users.hook';

jest.mock('../../hooks/users.hook', () => ({
  useUsers: jest.fn().mockReturnValue({
    logout: jest.fn(),
    loginLoadState: 'logged',
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
      await userEvent.click(logoutButton);
      expect(useUsers().logout).toHaveBeenCalled();
    });
  });
});
