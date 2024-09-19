import React, { useState, useContext } from "react";
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
  const { addUser } = userContext || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Valida o e-mail
  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  //Formata o telefone
  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, ""); // Remove tudo que não for número
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`; // Formato: (XX) XXXXX-XXXX
    }
    return input; // Retorna o valor sem formatação caso não tenha o padrão completo
  };

  // Valida o telefone
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  //Valida a visibilidade da senha
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Valida a força da senha
  const validatePasswordStrength = (password: string) => {
    return password.length >= 8;
  };

  const handleRegister = () => {
    let newErrors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) {
      newErrors.name = "Nome é obrigatório.";
    }
    if (!email || !validateEmail(email)) {
      newErrors.email = "E-mail inválido.";
    }
    if (!phone || !validatePhone(phone)) {
      newErrors.phone = "Telefone inválido. Exemplo: (11) 99999-9999";
    }
    if (!validatePasswordStrength(password)) {
      newErrors.password = "A senha deve ter no mínimo 8 caracteres.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);

    // Se houver erros, não continuar o registro
    if (Object.values(newErrors).some((error) => error !== "")) {
      setAlertMessage("Por favor, corrija os erros.");
      setAlertVisible(true);
      return;
    }

    const newUser = { name, email, phone, username, password };
    if (addUser) {
      addUser(newUser);
      setAlertMessage("Usuário registrado com sucesso!");
      navigation.navigate("Login");
    } else {
      setAlertMessage("Erro ao registrar usuário.");
    }
    setAlertVisible(true);
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title="Registro"
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />

      <Image
        source={{ uri: logoBase64 }}
        style={styles.logo}
      />

      {/* Nome Completo */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={name}
            onChangeText={setName}
          />
        </View>
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}
      </View>

      {/* E-mail */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
      </View>

      {/* Telefone */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={phone}
            onChangeText={(text) => setPhone(formatPhoneNumber(text))}
            keyboardType="phone-pad"
          />
        </View>
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}
      </View>

      {/* Nome de Usuário */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome de Usuário"
            value={username}
            onChangeText={setUsername}
          />
        </View>
      </View>

      {/* Senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          secureTextEntry={secureTextEntry} // Define se a senha é oculta ou visível
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureTextEntry(!secureTextEntry)} // Alterna o estado de visualização da senha
        >
          <Text style={styles.eyeIconText}>
            {secureTextEntry ? "👁️" : "🙈"}{" "}
            {/* Ícone alternando entre olho aberto e fechado */}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Confirmar Senha */}
      <View style={styles.inputWrapper}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirmPassword}
            secureTextEntry
            onChangeText={setConfirmPassword}
          />
        </View>
        {errors.confirmPassword ? (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        ) : null}
      </View>

      {/* Botão de Registro */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      {/* Botão para Voltar ao Login */}
      <TouchableOpacity
        style={[styles.button, styles.darkBlueButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
