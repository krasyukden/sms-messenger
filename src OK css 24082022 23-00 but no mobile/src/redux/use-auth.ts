import { RootState } from './reducer';
import { useAppSelector } from './redux-hook';


export function useAuth() {
  const { email, token, id, firstName, lastName } = useAppSelector((state: RootState) => state.user )

  return {
    isAuth: !!email,
    email,
    token,
    id,
    firstName,
    lastName
  }
}