import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { demoUser } from '../data/seed.js';
import { uid } from '../utils/format.js';

const AuthCtx = createContext(null);

// NOTE: Front-end-only demo. Real apps verify passwords on a server.
export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('yatra_users', [demoUser]);
  const [sessionId, setSessionId] = useLocalStorage('yatra_session', null);
  const user = users.find((u) => u.id === sessionId) || null;

  const login = (email, password) => {
    const found = users.find((u) => u.email === email.trim().toLowerCase() && u.password === password);
    if (!found) throw new Error('Email or password is incorrect.');
    setSessionId(found.id);
  };

  const register = ({ name, email, password }) => {
    const mail = email.trim().toLowerCase();
    if (users.some((u) => u.email === mail)) throw new Error('An account with this email already exists.');
    const newUser = { id: uid(), name: name.trim(), email: mail, password, city: '', phone: '' };
    setUsers([...users, newUser]);
    setSessionId(newUser.id);
  };

  const logout = () => setSessionId(null);
  const updateProfile = (patch) => setUsers(users.map((u) => (u.id === user.id ? { ...u, ...patch } : u)));

  return <AuthCtx.Provider value={{ user, login, register, logout, updateProfile }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
