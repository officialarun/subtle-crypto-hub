import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import { Profile } from './pages/Profile';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Trades from './pages/Trades';
import Deposits from './pages/Deposits';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin');
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!isAdmin || !adminToken) {
      navigate('/admin');
    }
  }, [navigate, isAdmin, adminToken]);

  if (!isAdmin || !adminToken) {
    return null;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trades"
              element={
                <ProtectedRoute>
                  <Trades />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deposits"
              element={
                <ProtectedRoute>
                  <Deposits />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
