// screens/LoginScreen.tsx

import React, { useContext, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { LoginScreenNavigationProp } from "../navigation/types";
import styles from "../styles/LoginScreen.styles";

// Tipagem das props que o componente receberá
type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // Acessa o contexto de usuário
  const userContext = useContext(UserContext);

  // Verifica se o contexto está definido
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  // Desestrutura a lista de usuários do contexto
  const { users } = userContext;

  // Definição dos estados locais para armazenar os valores dos inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Função para lidar com o login do usuário
  const handleLogin = () => {
    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (user) {
      // Navega para a tela de upload de imagens se a autenticação for bem-sucedida
      navigation.navigate("ImageUpload");
    } else {
      // Mostra um alerta se o nome de usuário ou senha estiverem incorretos
      alert("Nome de usuário ou senha incorretos!");
    }
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
          placeholderTextColor="#6c757d"
        />
      </View>

      {/* Campo de entrada para a senha com opção de visibilidade */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#6c757d"
        />
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

      {/* Botão para fazer login */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.darkBlueButton]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
