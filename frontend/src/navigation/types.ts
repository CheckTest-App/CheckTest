import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define a lista de parâmetros para o Stack Navigator
export type RootStackParamList = {
  Login: undefined; // Tela de Login não aceita parâmetros
  Register: undefined; // Tela de Registro não aceita parâmetros
  ImageUpload: undefined; // Tela de Upload de Imagem não aceita parâmetros
  Upload: undefined; // Tela de Upload de Provas não aceita parâmetros
  Correct: { resultado: { images: string[] } }; // Tela de Correção aceita um objeto de imagens como parâmetro
};

// Tipo genérico para navegação em qualquer tela
export type RootStackNavigationProp<T extends keyof RootStackParamList> = 
  NativeStackNavigationProp<RootStackParamList, T>;

// Tipagens específicas para telas individuais
export type LoginScreenNavigationProp = RootStackNavigationProp<"Login">;
export type RegisterScreenNavigationProp = RootStackNavigationProp<"Register">;
export type ImageUploadScreenNavigationProp = RootStackNavigationProp<"ImageUpload">;
export type UploadScreenNavigationProp = RootStackNavigationProp<"Upload">;
export type CorrectScreenNavigationProp = RootStackNavigationProp<"Correct">;