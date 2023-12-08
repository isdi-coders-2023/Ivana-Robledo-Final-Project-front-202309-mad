import { SyntheticEvent, useState } from 'react';
import { useUsers } from '../../hooks/users.hook';
import { registerForm } from './register.module.scss';
import { User } from '../../entities/user';

export function Register() {
  const [hasRegister, setHasRegister] = useState(false);
  const { register } = useUsers();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const data = {
      username: (formElement.elements.namedItem('username') as HTMLInputElement)
        .value,
      email: (formElement.elements.namedItem('email') as HTMLInputElement)
        .value,
      passwd: (formElement.elements.namedItem('passwd') as HTMLInputElement)
        .value,
    } as Partial<User>;
    register(data);
    setHasRegister(true);
    console.log(data.username);
  };

  const handleCloseOk = () => {
    setHasRegister(false);
  };

  return (
    <>
      <h2>Registro</h2>
      {!hasRegister && (
        <form onSubmit={handleSubmit} className={registerForm}>
          <input type="text" name="username" placeholder="Nombre de usuario" />
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="passwd"
            placeholder="Contraseña"
            required
          />
          <button type="submit">Registrar</button>
          <button type="button">Cancelar</button>
        </form>
      )}
      {hasRegister && (
        <div>
          <p>Registrado correctamente</p>
          <button type="button" onClick={handleCloseOk}>
            Continuar
          </button>
        </div>
      )}
    </>
  );
}
