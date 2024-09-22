import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import * as Network from 'expo-network';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [baseUrl, setBaseUrl] = useState("<IPv4>:3000/api");

  // useEffect(() => {
  //   const initializeBaseUrl = async () => {
  //     try {
  //       const ipAddress = await Network.getIpAddressAsync();
  //       console.log("ip: ", ipAddress);
  //       if (ipAddress) {
  //         setBaseUrl(`http://${ipAddress}:3000/api`);
  //       } else {
  //         setBaseUrl("<IPv4>:3000/api");
  //       }
  //     } catch (error) {
  //       console.error("Erro ao obter o endereço IP:", error);
  //       setBaseUrl("<IPv4>:3000/api");
  //     }
  //   };

  //   initializeBaseUrl();
  // }, []);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (token && baseUrl) {
          const response = await axios.get(`${baseUrl}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user);
          console.log("Dados do usuário recebidos:", response.data.user);
          setIsLogged(true);
        } else {
          setUser(null);
          setIsLogged(false);
        }
      } catch (error) {
        console.log("Erro ao inicializar o usuário:", error);
        setUser(null);
        setIsLogged(false);
      } finally {
        setLoading(false);
      }
    };

    if (baseUrl) {
      initializeUser();
    }
  }, [baseUrl]);

  useEffect(() => {
    if (user) {
      console.log("Usuário atualizado:", user);
    }
  }, [user]);

  useEffect(() => {
    if (baseUrl) {
      console.log("IP atualizado:", baseUrl);
    }
  }, [baseUrl]);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      console.log("Token atual no AsyncStorage:", token);
    });
  }, []);

  const login = async (token, userData) => {
    try {
      await AsyncStorage.setItem("token", token);
      setUser(userData);
      setIsLogged(true);
    } catch (error) {
      console.log("Erro ao salvar dados de login:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setUser(null);
      setIsLogged(false);
    } catch (error) {
      console.log("Erro ao fazer logout:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        login,
        logout,
        baseUrl,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
