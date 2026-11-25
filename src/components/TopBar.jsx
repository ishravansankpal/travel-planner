import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

// Top-right corner: theme toggle + profile menu with logout.
export default function TopBar() {
  const { user, logout } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const initials = user.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  // Close the menu on outside click or Escape.
  useEffect(() => {
    const onClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onClick); document.removeEventListener('keydown', onKey); };
  }, []);

  const handleLogout = () => { logout(); notify('Logged out'); navigate('/'); };

  return (
    <div className="app-topbar">
      <ThemeToggle />
      <div className="menu" ref={ref}>
        <button className="profile-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="menu">
          <span className="avatar">{initials}</span><span className="pname">{user.name.split(' ')[0]}</span><ChevronDown size={16} />
        </button>
        {open && (
          <div className="dropdown" role="menu">
            <div className="dd-head"><strong>{user.name}</strong><small>{user.email}</small></div>
            <Link to="/profile" role="menuitem" onClick={() => setOpen(false)}><User size={16} /> Profile</Link>
            <button role="menuitem" onClick={handleLogout}><LogOut size={16} /> Log out</button>
          </div>
        )}
      </div>
    </div>
  );
}
