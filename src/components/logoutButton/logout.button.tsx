import { Link } from 'react-router-dom';
import { useUsers } from '../../hooks/users.hook';
import styles from './logout.button.module.scss';

export function LogoutButton() {
  const { logout, loginLoadState } = useUsers();

  return (
    <>
      {loginLoadState === 'logged' && (
        <div className="login-link-button">
          <Link to={'/login'}>
            <button
              className={styles.logoutbutton}
              onClick={logout}
              role="button"
            >
              Logout
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
