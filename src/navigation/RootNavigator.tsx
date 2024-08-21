import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ImageUploadScreen from "../screens/TemplateUploadScreen";
import TestUploadScreen from "../screens/TestUploadScreen";
import CorrectScreen from "../screens/CorretScreen";
import { RootStackParamList } from "../navigation/types"; // Importa a tipagem das rotas

// Cria o Stack Navigator tipado corretamente com RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Tela de Login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Tela de Registro */}
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Tela de Upload de Imagem */}
        <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />

        {/* Tela de Upload de Provas */}
        <Stack.Screen name="TestUploadScreen" component={TestUploadScreen} />

        {/* Tela de Correção de Provas */}
        <Stack.Screen name="CorrectScreen" component={CorrectScreen} />

        {/* Tela de Upload de Template */}
        <Stack.Screen
          name="TemplateUploadScreen"
          component={ImageUploadScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
