// import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const isLoggedIn = true;
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to={location.state?.from || '/home'} />;
  }

  return children;
};
