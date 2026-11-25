import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button className="icon-btn theme-btn" onClick={toggleTheme} title={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-label="Toggle dark mode">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
