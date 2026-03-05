import { useState, useEffect } from "react";

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error("Failed to parse localStorage value:", error);
      return defaultValue;
    }
  });

  const setItem = (newValue) => {
    try {
      const valueToStore =
        typeof newValue === 'function' ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Failed to set localStorage value:", error);
    }
  };

  useEffect(() => {
    setItem(value);
  }, [value, key]);

  return [value, setItem];
}

export default useLocalStorage;