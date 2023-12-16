import { useUsers } from '../../hooks/users.hook';
import styles from './logout.button.module.scss';

export function LogoutButton() {
  const { logout, loginLoadState } = useUsers();

  return (
    <>
      {loginLoadState === 'logged' && (
        <div className="login-link-button">
          <button
            className={styles.logoutbutton}
            onClick={logout}
            onKeyDown={logout}
            role="button"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
