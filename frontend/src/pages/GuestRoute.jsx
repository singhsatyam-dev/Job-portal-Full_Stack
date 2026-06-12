import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const GuestRoute = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Outlet />;

  return user?.role === "recruiter"
    ? <Navigate to="/recruiter/dashboard" replace />
    : <Navigate to="/jobs" replace />;
};

export default GuestRoute;