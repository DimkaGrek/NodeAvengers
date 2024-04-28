import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';

import SharedLayout from './SharedLayout/SharedLayout';
import DashboardPage from '../pages/DashboardPage/DashboardPage.jsx';
import VerifyPage from '../pages/VerifyPage/VerifyPage';
import Loader from './Loader/Loader.jsx';

import { PublicRoute, PrivateRoute } from '../routes';
import { refreshThunk } from '../redux/auth/operations.js';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/slice.js';
import NotFound from '../pages/NotFound/NotFound.jsx';

const WelcomePage = lazy(() => import('pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('pages/HomePage/HomePage'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const link = isLoggedIn ? '/home' : '/welcome';

  useEffect(() => {
    const verified = localStorage.getItem('verified');
    if (!isLoggedIn && !verified) {
      dispatch(refreshThunk());
    }
  }, [dispatch, isLoggedIn]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          path="/welcome"
          element={
            <PublicRoute>
              <WelcomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/:id"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/verifyLogin/:messageCode"
          element={
            <PublicRoute>
              <VerifyPage />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/:boardName"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to={link} replace />} />
        <Route path="/" element={<Navigate to={link} replace />} />
        <Route
          path="/404"
          element={
            <PrivateRoute>
              <NotFound />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};
export default App;
