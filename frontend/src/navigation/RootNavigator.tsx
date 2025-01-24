import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ImageUploadScreen from "../screens/ImageUploadScreen";
import TemplateUploadScreen from "../screens/ImageUploadScreen";
import UploadScreen from "../screens/UploadScreen";
import CorrectScreen from "../screens/CorrectScreen";
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
        <Stack.Screen
          name="TemplateUploadScreen"
          component={TemplateUploadScreen}
        />
        <Stack.Screen name="UploadScreen" component={UploadScreen} />
        <Stack.Screen name="CorrectScreen" component={CorrectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
