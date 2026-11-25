import { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const ThemeCtx = createContext(null);

export function ThemeProvider({ children }) {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('yatra_theme', prefersDark ? 'dark' : 'light');

  // CSS reads this attribute to switch colour variables.
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return <ThemeCtx.Provider value={{ theme, toggleTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
