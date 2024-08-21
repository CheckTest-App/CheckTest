import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { LoginScreenNavigationProp } from "../navigation/types";
import styles from "../styles/LoginScreen.styles";

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // Estados para gerenciar o nome de usuário, senha e a visibilidade da senha
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Função para lidar com o login
  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação

    // Se a autenticação for bem-sucedida, navegue para a tela de upload de imagens
    navigation.navigate("ImageUpload");
  };

  return (
    <View style={styles.container}>
      {/* Exibe o logo da aplicação */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Campo de entrada para o nome de usuário */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#6c757d" // Cor do texto de placeholder
        />
      </View>

      {/* Campo de entrada para a senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={secureTextEntry} // Controla a visibilidade da senha
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#6c757d"
        />
        {/* Ícone para mostrar/ocultar a senha */}
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Text style={styles.eyeIconText}>
            {secureTextEntry ? "👁️" : "🙈"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Link para recuperação de senha */}
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
      </TouchableOpacity>

      {/* Botão para navegar para a tela de registro */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para fazer login com cor azul escuro */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.darkBlueButton]} // Aplica o estilo adicional azul escuro
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
