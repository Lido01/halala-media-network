import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_role'); // 'admin', 'editor', 'user', etc.

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is not provided, allow any authenticated user
  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  // Check if the user's role is included in the allowed list for this route
  return allowedRoles.includes(userRole)
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;