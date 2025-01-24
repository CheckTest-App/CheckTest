import React, { useState, useContext, useCallback } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import logoBase64 from "../assets/logoBase64";
import { UserContext } from "../contexts/UserContext";
import CustomAlert from "../components/CustomAlert";
import { RegisterScreenNavigationProp } from "../navigation/types";
import styles from "../styles/RegisterScreen.styles";

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const userContext = useContext(UserContext);
  const { users = [], addUser } = userContext || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = useCallback((email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone: string) => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
  }, []);

  const validatePasswordStrength = useCallback((password: string) => {
    return password.length >= 8;
  }, []);

  const formatPhoneNumber = useCallback((input: string) => {
    const cleaned = input.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : input;
  }, []);

  const handleRegister = () => {
    let newErrors = { name: "", email: "", phone: "", username: "", password: "", confirmPassword: "" };

    if (!name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!email || !validateEmail(email)) newErrors.email = "E-mail inválido.";
    if (!phone || !validatePhone(phone)) newErrors.phone = "Telefone inválido. Ex: (11) 99999-9999";
    if (!username.trim()) newErrors.username = "Nome de usuário é obrigatório.";
    if (!validatePasswordStrength(password)) newErrors.password = "A senha deve ter no mínimo 8 caracteres.";
    if (password !== confirmPassword) newErrors.confirmPassword = "As senhas não coincidem.";
    
    if (users.some((u) => u.email === email)) newErrors.email = "E-mail já cadastrado.";
    if (users.some((u) => u.username === username)) newErrors.username = "Nome de usuário já existe.";
    if (!users) {
      setAlertMessage("Erro ao carregar usuários.");
      setAlertVisible(true);
      return;
    }
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      setAlertMessage("Por favor, corrija os erros.");
      setAlertVisible(true);
      return;
    }

    const newUser = { name, email, phone, username, password };

    if (addUser && userContext?.setLoggedInUser) {
      addUser(newUser);
      userContext.setLoggedInUser(newUser);
      navigation.navigate("ImageUpload");
    } else {
      setAlertMessage("Erro ao registrar usuário.");
      setAlertVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title="Registro"
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />

      <Image source={{ uri: logoBase64 }} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
          accessibilityLabel="Campo de nome completo"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Campo de e-mail"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={(text) => setPhone(formatPhoneNumber(text))}
          keyboardType="phone-pad"
          accessibilityLabel="Campo de telefone"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          accessibilityLabel="Campo de nome de usuário"
        />
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          secureTextEntry={secureTextEntry}
          onChangeText={setPassword}
          accessibilityLabel="Campo de senha"
        />
        <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
          <Text style={styles.eyeIconText}>{secureTextEntry ? "👁️" : "🙈"}</Text>
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
          accessibilityLabel="Campo de confirmação de senha"
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.darkBlueButton]} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;