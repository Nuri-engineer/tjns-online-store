import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';

type UserAuthReturn = {
    isAuthenticated: boolean;
    user: RootState['user']['user'];
}

export const useAuth = (): UserAuthReturn => {
  const user = useSelector((state: RootState) => state.user.user);

  return {
    isAuthenticated: !!user,
    user,
  };
};
