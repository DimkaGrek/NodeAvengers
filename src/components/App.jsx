import { Navigate, Route, Routes } from "react-router-dom";

import WelcomePage from "../pages/WelcomePage/WelcomePage";
import AuthPage from "../pages/AuthPage/AuthPage";
import HomePage from "../pages/HomePage/HomePage";
import { PublicRoute, PrivateRoute } from "../routes";
import SharedLayout from "./SharedLayout/SharedLayout";

function App() {
  return (
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
              <h2>ScreensPage</h2>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="welcome" replace />} />
      </Route>
    </Routes>
  );
}
export default App;
