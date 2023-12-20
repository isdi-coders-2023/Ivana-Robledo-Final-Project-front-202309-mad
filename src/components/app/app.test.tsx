import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { appStore } from '../../store/store';
import '@testing-library/jest-dom';
import { AppRoutes } from '../app.routes/app.routes';
import { Header } from '../header/header';

render(
  <Router>
    <Provider store={appStore}>
      <Header></Header>
      <div className="main-div">
        <AppRoutes></AppRoutes>
      </div>
    </Provider>
  </Router>
);

test('should ', () => {
  const banner = screen.getByRole('banner');

  expect(banner).toBeInTheDocument();
});
