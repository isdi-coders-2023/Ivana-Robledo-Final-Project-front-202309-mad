import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Header } from './header';

describe('Given Header component', () => {
  describe('When we instantiate', () => {
    beforeEach(() => {
      const mockUsersReducer = () => ({
        loggedUser: null,
        loginLoadState: 'idle',
      });

      const mockStore = configureStore({
        reducer: {
          UsersState: mockUsersReducer,
        },
      });

      render(
        <Provider store={mockStore}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );
    });

    test('Then it should be in the document', () => {
      const headerElement = screen.getByRole('banner');
      expect(headerElement).toBeInTheDocument();
    });
  });
});
