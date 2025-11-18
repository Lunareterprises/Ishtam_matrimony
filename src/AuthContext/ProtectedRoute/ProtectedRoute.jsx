import { useAuth } from '../AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { admin, user } = useAuth();
  if (!admin && !user) return <Navigate to="/" replace />;
  return <Outlet />;
};
export default ProtectedRoute;
