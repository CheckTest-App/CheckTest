import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../app/screens/LoginScreen';
// Importe outras telas conforme necessário

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* Outras telas */}
    </Stack.Navigator>
  );
}
