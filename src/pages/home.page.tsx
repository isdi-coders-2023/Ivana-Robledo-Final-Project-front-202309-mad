import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <div className="login-link-button">
        <Link to={'/login'}>
          <button type="button">Inicia sesion</button>
        </Link>
      </div>
    </>
  );
}
