import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem("super_app_user_details"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
  }, []);
  return <div className="w-full">{children}</div>;
};

export default ProtectedRoute;
