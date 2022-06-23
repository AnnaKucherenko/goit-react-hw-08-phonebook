import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

export const RequireAuth = ({ children }) => {
  const status = useSelector((state) => state.persistedReducer.auth.status);
  const location = useLocation();

  if (status === 'pending' || status === 'idle') {
    return <div>Перевірка користувача</div>;
  }

  if (status === 'unauthorized') {
    return <Navigate to="login" state={location.pathname} />;
  }

  return <>{children}</>;
};