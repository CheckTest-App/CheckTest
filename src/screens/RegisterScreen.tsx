import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { RegisterScreenNavigationProp } from "../navigation/types";
import styles from "../styles/RegisterScreen.styles";

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  // Estados para gerenciar as entradas do usuário e visibilidade da senha
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // Estado para armazenar mensagens de erro para cada campo
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Validação de Email
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // Validação de Telefone
  const validatePhone = (phone: string) =>
    /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);

  // Formatação do Telefone
  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };

  // Validação de Força da Senha
  const validatePasswordStrength = (password: string) =>
    password.length >= 8 && /\d/.test(password) && /[A-Za-z]/.test(password);

  // Validação do Nome
  const validateName = (name: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: !name.trim() ? "Nome completo é obrigatório." : "",
    }));
    setName(name);
  };

  // Validação do Email
  const validateEmailInput = (email: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: !validateEmail(email) ? "Por favor, insira um e-mail válido." : "",
    }));
    setEmail(email);
  };

  // Validação do Telefone
  const validatePhoneInput = (phone: string) => {
    const formattedPhone = formatPhone(phone);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: !validatePhone(formattedPhone)
        ? "Por favor, insira no formato (00) 00000-0000."
        : "",
    }));
    setPhone(formattedPhone);
  };

  // Validação do Nome de Usuário
  const validateUsername = (username: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: !username.trim() ? "Nome de usuário é obrigatório." : "",
    }));
    setUsername(username);
  };

  // Validação da Senha
  const validatePasswordInput = (password: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: !validatePasswordStrength(password)
        ? "A senha deve ter pelo menos 8 caracteres, incluindo letras e números."
        : "",
    }));
    setPassword(password);
  };

  // Validação da Confirmação de Senha
  const validateConfirmPassword = (confirmPassword: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword:
        password !== confirmPassword ? "As senhas não coincidem." : "",
    }));
    setConfirmPassword(confirmPassword);
  };

  // Função para lidar com o processo de registro
  const handleRegister = () => {
    if (!Object.values(errors).some((error) => error !== "")) {
      alert("Usuário registrado com sucesso!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Exibe o logo ou título da aplicação */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Campo de entrada para o nome completo */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={validateName}
          placeholderTextColor="#6c757d"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      {/* Campo de entrada para o e-mail */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={validateEmailInput}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#6c757d"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Campo de entrada para o telefone */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={validatePhoneInput}
          keyboardType="numeric"
          maxLength={15}
          placeholderTextColor="#6c757d"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      {/* Campo de entrada para o nome de usuário */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={validateUsername}
          placeholderTextColor="#6c757d"
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}
      </View>

      {/* Campo de entrada para a senha com opção de visibilidade */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={validatePasswordInput}
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
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* Campo de entrada para confirmação da senha */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={secureTextEntry}
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
          placeholderTextColor="#6c757d"
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>

      {/* Botão para registrar o usuário */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para voltar ao login */}
      <View style={[styles.buttonContainer, styles.loginButton]}>
        <Button
          title="Voltar ao Login"
          onPress={() => navigation.goBack()}
          color="#0056b3"
        />
      </View>
    </View>
  );
};

export default RegisterScreen;
