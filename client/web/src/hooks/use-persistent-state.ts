import { useState, useEffect } from 'react';

export function usePersistentState<T>(
  key: string,
  defaultValue: T,
  storage: Storage = localStorage
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = storage.getItem(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.error(`Error reading ${key} from storage:`, error);
    }
    return defaultValue;
  });

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error saving ${key} to storage:`, error);
    }
  }, [key, state, storage]);

  return [state, setState];
}