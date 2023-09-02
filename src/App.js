import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/main-page/MainPage";
import LoginPage from "./pages/login-page/LoginPage";
import Dashboard from './pages/auth/dashboard/Dashboard';
import ManageUsers from './pages/auth/manage-users/ManageUsers';
import ManageProjects from './pages/auth/manage-projects/ManageProjects';
import ManageImages from './pages/auth/manage-images/ManageImages';

import { AuthProvider } from './components/auth/AuthContext';
import ProtectedRoutes from './components/auth/ProtectedRoutes';

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin_login" element={<LoginPage />} />

            <Route path="/" element={<ProtectedRoutes accessible_to={['admin','user']} />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/" element={<ProtectedRoutes accessible_to={['admin']} />}>
              <Route path="manage-users" element={<ManageUsers />} />
              <Route path="manage-projects" element={<ManageProjects />} />
              <Route path="manage-images" element={<ManageImages />} />
            </Route>

          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
