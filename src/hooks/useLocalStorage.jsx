// import { useEffect, useState } from "react";

// const getLocalData = (key, initialValue) => {
//   if (localStorage.getItem(key)) {
//     return JSON.parse(localStorage.getItem(key) || initialValue);
//   } else if (key) {
//     localStorage.setItem(key, JSON.stringify(initialValue));
//     return initialValue;
//   }
//   return null;
// };

// const useLocalStorage = (key, initialValue) => {
//   const [localData, setLocalData] = useState(getLocalData(key, initialValue));

//   const setData = async (key, value) => {
//     setLocalData(value);
//     localStorage.setItem(key, JSON.stringify(value));
//   };

//   useEffect(() => {
//     const handleChangeStorage = () => {
//       setLocalData(getLocalData(key, initialValue));
//     };

//     window.addEventListener("storage", handleChangeStorage, false);
//     return () => window.removeEventListener("storage", handleChangeStorage);
//   }, [key, initialValue]);

//   return { localData, setLocalData, setData };
// };

// export default useLocalStorage;

import { useState, useEffect } from "react";

function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    try {
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error(
        `Error parsing localStorage value for key "${key}":`,
        error
      );
      return defaultValue;
    }
  });

  const setItem = (newValue) => {
    try {
      const valueToStore =
        newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving to localStorage for key "${key}":`, error);
    }
  };

  useEffect(() => {
    setItem(value);
  }, [value, key]);

  return [value, setItem];
}

export default useLocalStorage;

// Usage
// const [name, setName] = useLocalStorage('user-name', '');
