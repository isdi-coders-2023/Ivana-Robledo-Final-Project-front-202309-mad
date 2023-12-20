import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { appStore } from '../store/store';
import MainPage from './main.page';
import '@testing-library/jest-dom';

describe('MainPage', () => {
  test('renders MainPage component', () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
          <MainPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Crear receta')).toBeInTheDocument();
  });
});
