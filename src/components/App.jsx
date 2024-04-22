import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { lazy, useEffect } from 'react';

import SharedLayout from './SharedLayout/SharedLayout';
import { TestPage } from '../pages/TestPage/TestPage';
import DashboardPage from '../pages/DashboardPage/DashboardPage.jsx';
import VerifyPage from '../pages/VerifyPage/VerifyPage';
import Sidebar from './Sidebar/Sidebar';
import Loader from './Loader/Loader.jsx';

import { PublicRoute, PrivateRoute } from '../routes';
import { refreshThunk } from '../redux/auth/operations.js';
import { selectIsRefreshing } from '../redux/auth/slice.js';

const WelcomePage = lazy(() => import('pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('pages/HomePage/HomePage'));

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

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
          path="/verifyLogin/:messageCode"
          element={
            <PublicRoute>
              <VerifyPage />
            </PublicRoute>
          }
        />
        {/* <Route path="*" element={<Navigate to="welcome" replace />} />
          <Route path="/" element={<Navigate to="welcome" replace />} /> */}
      </Route>
    </Routes>
  );
};
export default App;
