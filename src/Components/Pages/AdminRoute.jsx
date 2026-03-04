import { Navigate } from "react-router-dom";
import { useCart } from "../Store/ContextApi";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useCart();

  // If not logged in → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin → go home
  if (currentUser?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;