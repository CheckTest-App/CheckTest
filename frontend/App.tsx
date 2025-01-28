import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import RootNavigator from './src/navigation/RootNavigator';
import { UserProvider } from './src/contexts/UserContext';

const App = () => {
  useEffect(() => {
    async function prepareApp() {
      try {
        // Previne que o splash desapareça automaticamente
        await SplashScreen.preventAutoHideAsync();
        // Simula carregamento de recursos ou inicialização
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Esconde o splash manualmente após a inicialização
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, []);

  return (
    <UserProvider>
      <RootNavigator />
    </UserProvider>
  );
};

export default App;