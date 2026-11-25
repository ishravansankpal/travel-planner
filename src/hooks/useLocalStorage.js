import { useState, useEffect } from 'react';

// Works like useState, but the value is saved in the browser's LocalStorage.
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or blocked – app still works for this session */
    }
  }, [key, value]);

  return [value, setValue];
}
