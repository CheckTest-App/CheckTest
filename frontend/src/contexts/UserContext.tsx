import React, { createContext, useState, useEffect } from "react";
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
  addUser: (user: User) => void;
  setLoggedInUser: (user: User) => void;
  loadUsers: () => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
    checkLoggedInUser();
    console.log({users});
  }, []);

  const loadUsers = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      }
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
    }
  };

  const checkLoggedInUser = async () => {
    try {
      const storedLoggedInUser = await AsyncStorage.getItem("loggedInUser");
      if (storedLoggedInUser) {
        setLoggedInUser(JSON.parse(storedLoggedInUser));
      }
    } catch (error) {
      console.error("Erro ao verificar usuário logado", error);
    }
  };

  const addUser = async (user: User) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    try {
      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Erro ao salvar usuário", error);
    }
  };

  const setLoggedInUserWithPersistence = async (user: User) => {
    setLoggedInUser(user);
    try {
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(user));
    } catch (error) {
      console.error("Erro ao salvar usuário logado", error);
    }
  };

  const logout = async () => {
    setLoggedInUser(null);
    try {
      await AsyncStorage.removeItem("loggedInUser");
    } catch (error) {
      console.error("Erro ao realizar logout", error);
    }
  };

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
