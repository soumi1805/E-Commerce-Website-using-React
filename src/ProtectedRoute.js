import { Navigate, useLocation, Outlet } from "react-router-dom";
import  useLoginContext  from "./Contexts/LoginContext";

const ProtectedLayout = () => {
  const location = useLocation();
  const {user} = useLoginContext(); 

  const isAuthenticated = user !== null// Simulating auth check

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Render the nested route inside ProtectedLayout
};

export default ProtectedLayout;
