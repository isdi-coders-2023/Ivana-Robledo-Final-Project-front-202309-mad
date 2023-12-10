import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './app';
import { appStore } from '../../store/store';
import '@testing-library/jest-dom';

render(
  <Router>
    <Provider store={appStore}>
      <App />
    </Provider>
  </Router>
);

test('should ', () => {
  const main = screen.getByRole('main');

  expect(main).toBeInTheDocument();
});
