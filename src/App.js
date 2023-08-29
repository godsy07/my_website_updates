import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main-page/MainPage";
import LoginPage from "./pages/login-page/LoginPage";
import Dashboard from './pages/auth/dashboard/Dashboard';
import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoutes from './components/auth/ProtectedRoutes';

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin_login" element={<LoginPage />} />

          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
