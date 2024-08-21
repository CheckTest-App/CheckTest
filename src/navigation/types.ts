import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define a lista de parâmetros para o Stack Navigator
export type RootStackParamList = {
  Login: undefined; // Tela de Login não aceita parâmetros
  Register: undefined; // Tela de Registro não aceita parâmetros
  ImageUpload: undefined; // Tela de Upload de Imagem não aceita parâmetros
  TestUploadScreen: undefined; // Tela de Upload de Provas não aceita parâmetros
  CorrectScreen: undefined; // Tela de Correção de Provas não aceita parâmetros
  TemplateUploadScreen: undefined; // Tela de Upload de Template não aceita parâmetros
};

// Define o tipo de navegação específico para a tela de Login
export type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

// Define o tipo de navegação específico para a tela de Registro
export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Register"
>;
