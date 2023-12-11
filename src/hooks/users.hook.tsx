import { useDispatch, useSelector } from 'react-redux';
import { ApiRepoUsers } from '../services/api.repo.users';
import { loginThunk, registerThunk } from '../slice/users.thunk';
import { LoginUser, User } from '../entities/user';
import { ac } from '../slice/users.slice';
import { AppDispatch, RootState } from '../store/store';

export function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = new ApiRepoUsers();
  const { loggedUser, loginLoadState } = useSelector(
    (state: RootState) => state.UsersState
  );

  const register = (userToRegister: Partial<User>) => {
    dispatch(registerThunk({ repo, registerUser: userToRegister }));
  };

  const login = (loginUser: LoginUser) => {
    dispatch(loginThunk({ repo, loginUser }));
    console.log('login from hook ', loginUser, repo);
  };

  const logout = () => {
    dispatch(ac.logout());
    window.location.reload();
  };

  return {
    register,
    login,
    logout,
    loggedUser,
    loginLoadState,
  };
}
