import React, { useContext, useState, useCallback } from "react";
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from "react-native";
import logoBase64 from "../assets/logoBase64";
import { UserContext } from "../contexts/UserContext";
import { LoginScreenNavigationProp } from "../navigation/types";
import CustomAlert from "../components/CustomAlert";
import styles from "../styles/LoginScreen.styles";

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within UserProvider");
  }

  const { users, setLoggedInUser } = userContext;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Validação de login
  const handleLogin = useCallback(() => {
    if (!username || !password) {
      setAlertMessage("Por favor, preencha todos os campos.");
      setAlertVisible(true);
      return;
    }

    const user = users.find((u) => u.username === username);

    if (!user) {
      setAlertMessage("Usuário não encontrado.");
      setAlertVisible(true);
      return;
    }

    if (user.password !== password) {
      setAlertMessage("Senha incorreta.");
      setAlertVisible(true);
      return;
    }

    setLoggedInUser(user);
    navigation.navigate("ImageUpload");
  }, [username, password, users, navigation, setLoggedInUser]);

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title="Erro"
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />

      <Image source={{ uri: logoBase64 }} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#6c757d"
          accessibilityLabel="Campo de entrada para nome de usuário"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#6c757d"
          accessibilityLabel="Campo de entrada para senha"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          accessibilityLabel="Mostrar ou esconder senha"
        >
          <Text style={styles.eyeIconText}>{secureTextEntry ? "👁️" : "🙈"}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => Alert.alert("Recuperação de senha", "Funcionalidade ainda não disponível.")}>
        <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
          accessibilityLabel="Botão para cadastrar novo usuário"
        >
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.darkBlueButton]}
          onPress={handleLogin}
          accessibilityLabel="Botão para realizar login"
        >
          <Text style={styles.buttonText}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;