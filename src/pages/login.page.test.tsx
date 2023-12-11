import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../store/store';

import LoginPage from './login.page';

describe('Given the page Login', () => {
  describe('When it is rendered', () => {
    render(
      <MemoryRouter>
        <Provider store={appStore}>
          <LoginPage></LoginPage>
        </Provider>
      </MemoryRouter>
    );
    test('Then,', () => {
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });
  });
});
