import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { appStore } from '../../store/store';
import { MemoryRouter as Router } from 'react-router-dom';
import { Register } from './register';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { useUsers } from '../../hooks/users.hook';

jest.mock('../../hooks/users.hook', () => ({
  useUsers: jest.fn().mockReturnValue({
    register: jest.fn(),
  }),
}));

describe('Given Register component', () => {
  describe('When the Register component is rendered', () => {
    test('Then renders register form and handles submission', async () => {
      render(
        <Router>
          <Provider store={appStore}>
            <Register></Register>
          </Provider>
        </Router>
      );

      const title = screen.getByText('Registro');
      const form = screen.getByRole('form');
      const input = screen.getAllByRole('textbox');
      await userEvent.type(input[0], 'test');
      await userEvent.click(screen.getAllByRole('button')[0]);
      await fireEvent.submit(form);

      expect(title).toBeInTheDocument();
      expect(useUsers().register).toHaveBeenCalled();
    });

    test('Then closes the success message on "Continuar" button click', async () => {
      render(
        <Router>
          <Provider store={appStore}>
            <Register></Register>
          </Provider>
        </Router>
      );

      const input = screen.getAllByRole('textbox');
      await userEvent.type(input[0], 'test');
      await userEvent.click(screen.getAllByRole('button')[0]);
      await fireEvent.submit(screen.getByRole('form'));

      // Verificar que el mensaje de éxito esté presente después de enviar el formulario
      expect(screen.getByText('Registrado correctamente')).toBeInTheDocument();

      // Simular hacer clic en el botón "Continuar"
      await userEvent.click(screen.getByText('Continuar'));

      // Verificar que el mensaje de éxito ya no esté presente
      expect(
        screen.queryByText('Registrado correctamente')
      ).not.toBeInTheDocument();
    });
  });
});
