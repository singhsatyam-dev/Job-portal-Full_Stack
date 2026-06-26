import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Redirects unauthenticated users to /login
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

// Redirects non-recruiters to home
export const RoleRoute = ({ role }) => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (user?.role !== role) return <Navigate to="/" replace />;
  return <Outlet />;
};

// Jobseeker-only route - only authenticated jobseekers can access
export const JobseekerRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (user?.role !== "jobseeker") return <Navigate to="/" replace />;
  return <Outlet />;
};
