import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Redirects unauthenticated users to /login
export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// Redirects non-recruiters to home
export const RoleRoute = ({ role }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== role) return <Navigate to="/" replace />;
  return <Outlet />;
};
