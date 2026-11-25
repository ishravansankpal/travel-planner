import { NavLink, Outlet } from 'react-router-dom';
import { Compass, LayoutDashboard, Map, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { TripsProvider } from '../context/TripsContext.jsx';
import TopBar from '../components/TopBar.jsx';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/trips', label: 'My trips', icon: Map },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function AppLayout() {
  const { user } = useAuth();
  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand"><Compass size={24} /> Yatra</div>
        <nav>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
              <Icon size={18} /> <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="main">
        <TopBar />
        <main className="content">
          {/* key gives each user their own fresh trip state */}
          <TripsProvider key={user.id} userId={user.id}><Outlet /></TripsProvider>
        </main>
      </div>
    </div>
  );
}
