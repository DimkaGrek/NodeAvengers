import { Route, Routes } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AuthPage from "./pages/AuthPage/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/auth/:id" element={<AuthPage />} />
      <Route path="*" element={<WelcomePage />} />
    </Routes>
  );
}
export default App;
