import { Route, Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect
import useUserRole from '../../hooks/useUserRole';

const AdminRoute = ({ children, ...rest }) => {
  const userRole = useUserRole();  // Custom hook to get the user role

  if (userRole === null) {
    // Show loading or splash screen if role is not available yet
    return <div>Loading...</div>;
  }

  if (userRole === 'admin') {
    alert("You are an admin!"); // Show an alert if the user is an admin
  } else if (userRole === 'user') {
    alert("You are a regular user!"); // Show an alert if the user is a regular user
  }

  return (
    userRole === 'admin' || userRole === 'user' ? (
      children
    ) : (
      <Navigate to="/login" />  // Redirect to login if the user is not logged in
    )
  );
};

export default AdminRoute;
