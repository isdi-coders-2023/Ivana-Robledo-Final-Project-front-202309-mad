import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogoutButton } from '../logoutButton/logout.button';
import styles from './header.module.scss';
import { useUsers } from '../../hooks/users.hook';

export function Header() {
  const { loginLoadState } = useUsers();
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/myrecipes/';

  return (
    <>
      {loginLoadState !== 'logged' && (
        <header className={styles.header}>
          <div className={styles.logotipo}>
            <img src="logo.png" alt="Logo de galleta" width={50} />
            <h1>Sugar spells</h1>
          </div>
        </header>
      )}
      {loginLoadState === 'logged' && (
        <header className={styles.header}>
          <Link to={'/main'}>
            <div className={styles.logotipo}>
              <img src="logo.png" alt="Logo de galleta" width={50} />
              <h1>Sugar spells</h1>
            </div>
          </Link>
          <div className={styles.headerButtons}>
            <Link to={'/'}>
              <LogoutButton></LogoutButton>
            </Link>
            <div className={styles.myRecipesLinkButton}>
              {!isProfilePage && location.pathname !== '/myrecipes' && (
                <button
                  data-testid="button"
                  className={styles.myrecipesbutton}
                  onClick={() => navigate('/myrecipes')}
                >
                  Mis recetas
                </button>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
}
