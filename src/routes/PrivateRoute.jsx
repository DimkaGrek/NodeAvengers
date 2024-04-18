// import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = true;
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/welcome" state={{ from: location }} />;
  }

  return children;
};
