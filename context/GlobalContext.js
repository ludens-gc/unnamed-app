import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const segments = useSegments();
  const router = useRouter();

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (user && segments[0] === '(auth)') {
      router.replace('(tabs)/home');
    } else if (!user && segments[0] !== '(auth)') {
      router.replace('(auth)/sign-in');
    }
  }, [user, segments]);

  return (
    <GlobalContext.Provider value={{ user, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
