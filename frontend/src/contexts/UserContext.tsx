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

  const addUser = async (user: User) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    try {
      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Erro ao salvar usuário", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ users, loggedInUser, addUser, setLoggedInUser, loadUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};