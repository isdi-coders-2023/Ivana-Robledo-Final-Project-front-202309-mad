import { useDispatch, useSelector } from 'react-redux';
import { ApiRepoUsers } from '../services/api.repo.users';
import { loginThunk } from '../slice/users.thunk';
import { LoginUser, User } from '../entities/user';
import { ac } from '../slice/users.slice';
import { AppDispatch, RootState } from '../store/store';

export function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const repo = new ApiRepoUsers();
  const { loggedUser } = useSelector((state: RootState) => state.UsersState);

  const register = (newUser: Partial<User>) => {
    repo.register(newUser);
  };

  const login = (loginUser: LoginUser) => {
    dispatch(loginThunk({ loginUser, repo }));
  };

  const logout = () => {
    dispatch(ac.logout());
  };

  return {
    register,
    login,
    logout,
    loggedUser,
  };
}
