import { Navigate, Route, Routes } from 'react-router-dom';

import { PublicRoute, PrivateRoute } from '../routes';
import { TestPage } from '../pages/TestPage/TestPage';
import { lazy, useEffect } from 'react';
import SharedLayout from './SharedLayout/SharedLayout';
import DashboardPage from '../pages/DashboardPage/DashboardPage.jsx';
import VerifyPage from '../pages/VerifyPage/VerifyPage';
import Sidebar from './Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { refreshThunk } from '../redux/auth/operations.js';
import { selectIsLoading } from '../redux/auth/slice.js';

const WelcomePage = lazy(() => import('pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('pages/HomePage/HomePage'));

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return (
    !isLoading && (
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
          <Route path="/sidebar" element={<Sidebar />} />
          <Route
            path="/home/:boardName"
            element={
              <PrivateRoute>
                <h2>ScreensPage</h2>
              </PrivateRoute>
            }
          />
          <Route path="/test" element={<TestPage />} />
          <Route
            path="/auth/verifyLogin/:messageCode"
            element={<VerifyPage />}
          />
          <Route path="*" element={<Navigate to="welcome" replace />} />
          <Route path="/" element={<Navigate to="welcome" replace />} />
        </Route>
      </Routes>
    )
  );
};
export default App;
