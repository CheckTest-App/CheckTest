import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { RegisterScreenNavigationProp } from "../navigation/types";
import CustomAlert from "../screens/CustomAlert";
import styles from "../styles/RegisterScreen.styles";

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { addUser } = userContext;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: "", message: "" });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Validações omitidas para brevidade

  const handleRegister = () => {
    if (isButtonDisabled) return;

    const newUser = { name, email, phone, username, password };
    addUser(newUser);
    setAlertData({
      title: "Sucesso",
      message: "Usuário registrado com sucesso!",
    });
    setAlertVisible(true);
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => {
          setAlertVisible(false);
          navigation.navigate("Login");
        }}
      />

      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#6c757d"
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
          placeholderTextColor="#6c757d"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Outros campos de entrada... */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isButtonDisabled && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={isButtonDisabled}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.buttonContainer, styles.loginButton]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
