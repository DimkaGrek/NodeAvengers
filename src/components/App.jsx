import { Navigate, Route, Routes } from 'react-router-dom';

// import { PublicRoute, PrivateRoute } from '../routes';
import { TestPage } from '../pages/TestPage/TestPage';
import { lazy, useEffect } from 'react';
import SharedLayout from './SharedLayout/SharedLayout';
import DashboardPage from '../pages/DashboardPage/DashboardPage.jsx';
import VerifyPage from '../pages/VerifyPage/VerifyPage';
import Sidebar from './Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { refreshThunk } from '../redux/auth/operations.js';

const WelcomePage = lazy(() => import('pages/WelcomePage/WelcomePage'));
const AuthPage = lazy(() => import('pages/AuthPage/AuthPage'));
const HomePage = lazy(() => import('pages/HomePage/HomePage'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  // const isLoggedIn = useSelector(selectIsLoggedIn);
  // const isLoggedIn = true;

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/auth/:id" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:boardName" element={<DashboardPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/home/:boardName" element={<h2>ScreensPage</h2>} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/auth/verifyLogin/:messageCode" element={<VerifyPage />} />
        <Route path="*" element={<Navigate to="welcome" replace />} />
        <Route path="/" element={<Navigate to="welcome" replace />} />
        {/* <Route
          path="/"
          element={<Navigate to={isLoggedIn ? 'home' : 'welcome'} replace />}
        /> */}
      </Route>
    </Routes>
  );
};
export default App;
