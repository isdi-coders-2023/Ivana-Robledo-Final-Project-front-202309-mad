import { Header } from '../header/header';
import { Login } from '../login/login';
import { LogoutButton } from '../logoutButton/logout.button';
import { Register } from '../register/register';

export function App() {
  return (
    <main>
      <Header></Header>
      <Register></Register>
      <Login></Login>
      <LogoutButton></LogoutButton>
    </main>
  );
}
