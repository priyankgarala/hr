import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;