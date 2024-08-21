import React, { useState } from "react";
import {View, Text, TextInput, Button, TouchableOpacity, Image} from "react-native";
import { RegisterScreenNavigationProp } from "../navigation/types";
import styles from "../styles/RegisterScreen.styles";

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const validatePhone = (phone: string) =>
    /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);

  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };

  const validatePasswordStrength = (password: string) =>
    password.length >= 8 && /\d/.test(password) && /[A-Za-z]/.test(password);

  const validateName = (name: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: !name.trim() ? "Nome completo é obrigatório." : "",
    }));
    setName(name);
  };

  const validateEmailInput = (email: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: !validateEmail(email) ? "Por favor, insira um e-mail válido." : "",
    }));
    setEmail(email);
  };

  const validatePhoneInput = (phone: string) => {
    const formattedPhone = formatPhone(phone);
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: !validatePhone(formattedPhone)
        ? "Por favor, insira no formato (00) 00000-0000." : "",
    }));
    setPhone(formattedPhone);
  };

  const validateUsername = (username: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: !username.trim() ? "Nome de usuário é obrigatório." : "",
    }));
    setUsername(username);
  };

  const validatePasswordInput = (password: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: !validatePasswordStrength(password)
        ? "A senha deve ter pelo menos 8 caracteres, incluindo letras e números." : "",
    }));
    setPassword(password);
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword:
        password !== confirmPassword ? "As senhas não coincidem." : "",
    }));
    setConfirmPassword(confirmPassword);
  };

  const handleRegister = () => {
    if (!Object.values(errors).some((error) => error !== "")) {
      alert("Usuário registrado com sucesso!");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={validateName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={validateEmailInput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={validatePhoneInput}
          keyboardType="numeric"
          maxLength={15}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={validateUsername}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={validatePasswordInput}
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={secureTextEntry}
          value={confirmPassword}
          onChangeText={validateConfirmPassword}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Registrar" onPress={handleRegister} color="#007bff" />
      </View>

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
