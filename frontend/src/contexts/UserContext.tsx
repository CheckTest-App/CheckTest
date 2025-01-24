import React, { createContext, useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
};

type UserContextType = {
  users: User[];
  loggedInUser: User | null;
  addUser: (user: User) => Promise<void>;
  setLoggedInUser: (user: User) => Promise<void>;
  loadUsers: () => Promise<void>;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
    checkLoggedInUser();
  }, []);

  // Função para carregar os usuários armazenados localmente
  const loadUsers = useCallback(async () => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error("Erro ao carregar usuários do AsyncStorage:", error);
    }
  }, []);

  // Função para verificar se há um usuário logado armazenado
  const checkLoggedInUser = useCallback(async () => {
    try {
      const storedLoggedInUser = await AsyncStorage.getItem("loggedInUser");
      if (storedLoggedInUser) {
        setLoggedInUser(JSON.parse(storedLoggedInUser));
      }
    } catch (error) {
      console.error("Erro ao verificar usuário logado no AsyncStorage:", error);
    }
  }, []);

  // Adiciona um novo usuário à lista e o salva no AsyncStorage
  const addUser = useCallback(async (user: User) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers, user];
      AsyncStorage.setItem("users", JSON.stringify(updatedUsers)).catch((error) =>
        console.error("Erro ao salvar usuários no AsyncStorage:", error)
      );
      return updatedUsers;
    });
  }, []);

  // Define o usuário logado e o armazena no AsyncStorage
  const setLoggedInUserWithPersistence = useCallback(async (user: User) => {
    setLoggedInUser(user);
    try {
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (error) {
      console.error("Erro ao salvar usuário logado no AsyncStorage:", error);
    }
  }, []);

  // Realiza o logout, removendo o usuário logado do estado e AsyncStorage
  const logout = useCallback(async () => {
    setLoggedInUser(null);
    try {
      await AsyncStorage.removeItem("loggedInUser");
    } catch (error) {
      console.error("Erro ao realizar logout no AsyncStorage:", error);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        loggedInUser,
        addUser,
        setLoggedInUser: setLoggedInUserWithPersistence,
        loadUsers,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};