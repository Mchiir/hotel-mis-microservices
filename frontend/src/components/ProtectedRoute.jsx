import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import Loader from './Loader.jsx';

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader label="Checking session..." />;

  if (!user) return <Navigate to="/login" replace />;

  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
