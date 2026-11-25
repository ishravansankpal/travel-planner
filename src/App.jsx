import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import Landing from './pages/Landing.jsx';
import AuthPage from './pages/AuthPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Trips from './pages/Trips.jsx';
import TripDetail from './pages/TripDetail.jsx';
import Profile from './pages/Profile.jsx';

// Only logged-in users can see pages inside AppLayout.
function Protected() {
  const { user } = useAuth();
  return user ? <AppLayout /> : <Navigate to="/login" replace />;
}

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage mode="login" />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage mode="register" />} />
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/:id" element={<TripDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
