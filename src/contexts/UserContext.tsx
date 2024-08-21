// contexts/UserContext.tsx

import React, { createContext, useState, ReactNode } from "react";

// Definição do tipo User que representa um usuário
type User = {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
};

// Definição do tipo do contexto, especificando os dados e funções que ele expõe
type UserContextType = {
  users: User[]; // Array de usuários registrados
  addUser: (user: User) => void; // Função para adicionar um novo usuário
};

// Criação do contexto de usuários, com valor inicial undefined
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// Componente provedor que envolve a aplicação, fornecendo o contexto de usuários
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Estado local que armazena a lista de usuários
  const [users, setUsers] = useState<User[]>([]);

  // Função que adiciona um novo usuário à lista
  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    // Provedor do contexto, que passa os valores e funções para os componentes filhos
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};
