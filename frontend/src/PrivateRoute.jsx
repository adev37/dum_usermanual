import { Navigate } from "react-router-dom";

/**
 * PrivateRoute component to restrict access to authenticated users.
 * @param {object} props - Component props
 * @param {JSX.Element} props.element - The component to render if authenticated
 * @param {boolean} props.isAuthenticated - Authentication status
 * @returns {JSX.Element} - Returns the element if authenticated, otherwise redirects to login
 */
const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
