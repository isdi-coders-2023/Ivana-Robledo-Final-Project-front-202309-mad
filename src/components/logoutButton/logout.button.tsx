import Swal from 'sweetalert2';
import { useUsers } from '../../hooks/users.hook';
import styles from './logout.button.module.scss';
import { useNavigate } from 'react-router-dom';

export function LogoutButton() {
  const navigate = useNavigate();
  const { logout, loginLoadState } = useUsers();

  const handleLogout = () => {
    logout();
    Swal.fire({
      icon: 'success',
      title: 'Has cerrado sesion correctamente.Nos vemos pronto!',
      showConfirmButton: false,
      timer: 1500,
    });
    navigate('/');
  };

  return (
    <>
      {loginLoadState === 'logged' && (
        <div className={styles.loginLinkButton}>
          <button
            className={styles.logoutbutton}
            onClick={handleLogout}
            role="button"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
}
