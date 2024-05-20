import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  console.log(user, "user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
  }, []);

  return children;
}

export default ProtectedRoute;
