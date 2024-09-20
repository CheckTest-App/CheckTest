import React from "react";
import { UserProvider } from "./src/contexts/UserContext"; // Importa o UserProvider que envolve o contexto de usuário
import AppNavigator from "./src/navigation/RootNavigator"; // Importa o componente de navegação principal da aplicação

const App: React.FC = () => {
  return (
    // Envolve a aplicação com o UserProvider para fornecer o contexto de usuários a todos os componentes
    <UserProvider>
      {/* O AppNavigator gerencia a navegação da aplicação */}
      <AppNavigator />
    </UserProvider>
  );
};

export default App;
