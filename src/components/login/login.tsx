import { SyntheticEvent, useState } from 'react';
import { useUsers } from '../../hooks/users.hook';
import { LoginUser } from '../../entities/user';
import { Link } from 'react-router-dom';

export function Login() {
  const [hasLogin, setHasLogin] = useState(false);
  const { login } = useUsers();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const loginUser: LoginUser = {
      email: formData.get('email')?.toString() as string,
      passwd: formData.get('passwd')?.toString() as string,
    };
    login(loginUser);
    setHasLogin(true);
  };

  return (
    <>
      <h2>Login</h2>
      {!hasLogin && (
        <form onSubmit={handleSubmit} className="login-form">
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="passwd"
            placeholder="Password"
            required
          />
          <button type="submit">LOGIN</button>
          <div className="cancel-button">
            <Link to={'/'}>
              <button type="button">CANCEL</button>
            </Link>
          </div>
        </form>
      )}
      {hasLogin && (
        <div>
          <p>SUCESS</p>
        </div>
      )}
    </>
  );
}
