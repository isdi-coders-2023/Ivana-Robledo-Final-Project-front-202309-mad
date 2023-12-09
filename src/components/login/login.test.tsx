import { fireEvent, render, screen } from '@testing-library/react';
import { Login } from './login';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../store/store';
import { useUsers } from '../../hooks/users.hook';

jest.mock('../../hooks/users.hook', () => ({
  useUsers: jest.fn().mockReturnValue({
    login: jest.fn(),
  }),
}));

describe('Login Component', () => {
  render(
    <Router>
      <Provider store={appStore}>
        <Login></Login>
      </Provider>
    </Router>
  );
  test('Then it submits form with correct values', async () => {
    const formElement = screen.getByRole('form');
    const inputElements = screen.getAllByRole('textbox');
    const submitButton = screen.getByRole('button', { name: 'Iniciar sesión' });
    await userEvent.type(inputElements[0], 'test');
    await userEvent.click(submitButton);
    await fireEvent.submit(formElement);
    await userEvent.type(formElement, '{enter}');
    expect(useUsers().login).toHaveBeenCalled();
  });
});
