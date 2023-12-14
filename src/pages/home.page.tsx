import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <>
      <div className="login-link-button">
        <Link to={'/login'}>
          <button type="button">Inicia sesion</button>
        </Link>
      </div>
      <div className="create-link-button">
        <Link to={'/create'}>
          <button type="button">Crea receta</button>
        </Link>
      </div>
    </>
  );
}
