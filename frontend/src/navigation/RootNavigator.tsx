import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ImageUploadScreen from "../screens/TemplateUploadScreen";
import TestUploadScreen from "../screens/TestUploadScreen";
import CorrectScreen from "../screens/CorretScreen";
import { RootStackParamList } from "../navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />
        <Stack.Screen name="TestUploadScreen" component={TestUploadScreen} />
        <Stack.Screen name="CorrectScreen" component={CorrectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;