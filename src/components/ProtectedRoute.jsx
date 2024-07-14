import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

function ProtectedRoute({ children, adminOnly }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    if (adminOnly && user.access.role !== "Admin") {
      navigate("/not-authorized", { replace: true }); // Yetkisiz kullanıcılar için yönlendirme
      return;
    }
  }, [user, navigate, adminOnly]);

  return children;
}

export default ProtectedRoute;
