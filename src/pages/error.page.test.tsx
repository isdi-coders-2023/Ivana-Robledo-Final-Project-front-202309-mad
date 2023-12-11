import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { appStore } from '../store/store';
import ErrorPage from './error.page';

describe('Given the page Register', () => {
  describe('When it is rendered', () => {
    render(
      <MemoryRouter>
        <Provider store={appStore}>
          <ErrorPage></ErrorPage>
        </Provider>
      </MemoryRouter>
    );
    test('Then,', () => {
      const errorMesage = screen.getByText('404 NOT FOUND');
      expect(errorMesage).toBeInTheDocument();
    });
  });
});
