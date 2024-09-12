import React, { useState } from "react"; // Importa React e o hook useState para gerenciar estado
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native"; // Importa componentes do React Native para construção da interface do usuário
import { RegisterScreenNavigationProp } from "../navigation/types"; // Importa o tipo de navegação para a tela de registro
import styles from "../styles/RegisterScreen.styles"; // Importa os estilos da tela de registro
import CustomAlert from "../components/CustomAlert"; // Componente de alerta customizado para exibir mensagens de sucesso ou erro

// Tipagem para as propriedades que o componente receberá (navegação)
type Props = {
  navigation: RegisterScreenNavigationProp; // Define o tipo da propriedade de navegação
};

// Componente funcional para a tela de registro de usuário
const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  // Estados para armazenar valores dos inputs
  const [name, setName] = useState(""); // Estado para o nome
  const [email, setEmail] = useState(""); // Estado para o e-mail
  const [phone, setPhone] = useState(""); // Estado para o telefone
  const [username, setUsername] = useState(""); // Estado para o nome de usuário
  const [password, setPassword] = useState(""); // Estado para a senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar a senha
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Estado para controlar a visibilidade da senha
  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true); // Estado para controlar a visibilidade da confirmação de senha

  // Estado para armazenar mensagens de erro de validação
  const [errors, setErrors] = useState({
    name: "", // Erro de nome
    email: "", // Erro de e-mail
    phone: "", // Erro de telefone
    username: "", // Erro de nome de usuário
    password: "", // Erro de senha
    confirmPassword: "", // Erro de confirmação de senha
  });

  const [alertVisible, setAlertVisible] = useState(false); // Estado para controlar a visibilidade do alerta
  const [alertMessage, setAlertMessage] = useState(""); // Estado para a mensagem do alerta

  // Função para validar o formato de e-mail
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // Função para validar o formato do telefone
  const validatePhone = (phone: string) =>
    /^\(\d{2}\) \d{5}-\d{4}$/.test(phone);

  // Função para formatar o telefone no formato correto
  const formatPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, ""); // Remove tudo que não for número
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/); // Captura o telefone no formato desejado
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone; // Retorna o telefone formatado
  };

  // Função para validar a força da senha
  const validatePasswordStrength = (password: string) =>
    password.length >= 8 && /\d/.test(password) && /[A-Za-z]/.test(password); // Verifica se a senha tem pelo menos 8 caracteres, um número e uma letra

  // Função para validar o campo de nome
  const validateName = (name: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: !name.trim() ? "Nome completo é obrigatório." : "", // Se o nome estiver vazio, define o erro
    }));
    setName(name); // Atualiza o estado do nome
  };

  // Função para validar o e-mail
  const validateEmailInput = (email: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: !validateEmail(email) ? "Por favor, insira um e-mail válido." : "", // Define erro se o e-mail for inválido
    }));
    setEmail(email); // Atualiza o estado do e-mail
  };

  // Função para validar o telefone
  const validatePhoneInput = (phone: string) => {
    const formattedPhone = formatPhone(phone); // Formata o telefone
    setErrors((prevErrors) => ({
      ...prevErrors,
      phone: !validatePhone(formattedPhone)
        ? "Por favor, insira no formato (00) 00000-0000." // Define erro se o formato estiver incorreto
        : "",
    }));
    setPhone(formattedPhone); // Atualiza o estado do telefone
  };

  // Função para validar o nome de usuário
  const validateUsername = (username: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      username: !username.trim() ? "Nome de usuário é obrigatório." : "", // Define erro se o campo de usuário estiver vazio
    }));
    setUsername(username); // Atualiza o estado do nome de usuário
  };

  // Função para validar a senha
  const validatePasswordInput = (password: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: !validatePasswordStrength(password)
        ? "A senha deve ter pelo menos 8 caracteres, incluindo letras e números." // Define erro se a senha for fraca
        : "",
    }));
    setPassword(password); // Atualiza o estado da senha
  };

  // Função para validar a confirmação da senha
  const validateConfirmPassword = (confirmPassword: string) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword:
        password !== confirmPassword ? "As senhas não coincidem." : "", // Define erro se as senhas não forem iguais
    }));
    setConfirmPassword(confirmPassword); // Atualiza o estado da confirmação de senha
  };

  // Função para registrar o usuário
  const handleRegister = () => {
    const hasErrors =
      Object.values(errors).some((error) => error !== "") || // Verifica se há algum erro de validação
      !name || // Verifica se o nome está vazio
      !email || // Verifica se o e-mail está vazio
      !phone || // Verifica se o telefone está vazio
      !username || // Verifica se o nome de usuário está vazio
      !password || // Verifica se a senha está vazia
      !confirmPassword; // Verifica se a confirmação de senha está vazia

    if (hasErrors) {
      setAlertMessage("Preencha todos os campos corretamente."); // Se houver erros, define a mensagem de erro
      setAlertVisible(true); // Exibe o alerta
    } else {
      setAlertMessage("Usuário registrado com sucesso!"); // Se tudo estiver correto, define a mensagem de sucesso
      setAlertVisible(true); // Exibe o alerta
    }
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={
          alertMessage === "Usuário registrado com sucesso!"
            ? "Sucesso"
            : "Erro"
        }
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />

      {/* Renderizando o logo */}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Nome Completo */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            value={name}
            onChangeText={validateName}
          />
        </View>
        {/* Certifique-se de que o erro está dentro de <Text> */}
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      {/* E-mail */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={validateEmailInput}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      {/* Telefone */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={phone}
            onChangeText={validatePhoneInput}
            keyboardType="numeric"
            maxLength={15}
          />
        </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      {/* Usuário */}
      <View style={styles.inputWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Usuário"
            value={username}
            onChangeText={validateUsername}
          />
        </View>
        {errors.username && (
          <Text style={styles.errorText}>{errors.username}</Text>
        )}
      </View>

      {/* Senha */}
      <View style={styles.inputWrapper}>
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
            {/* Corrige para que o ícone seja renderizado dentro de <Text> */}
            <Text style={styles.eyeIconText}>
              {secureTextEntry ? "👁️" : "🙈"}
            </Text>
          </TouchableOpacity>
        </View>
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      {/* Confirmar Senha */}
      <View style={styles.inputWrapper}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            secureTextEntry={confirmSecureTextEntry}
            value={confirmPassword}
            onChangeText={validateConfirmPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setConfirmSecureTextEntry(!confirmSecureTextEntry)}
          >
            <Text style={styles.eyeIconText}>
              {confirmSecureTextEntry ? "👁️" : "🙈"}
            </Text>
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>

      {/* Botão para Registrar */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      {/* Botão para Voltar ao Login */}
      <TouchableOpacity
        style={[styles.button, styles.darkBlueButton, styles.loginButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar ao Login</Text>
      </TouchableOpacity>
    </View>
  );
};


export default RegisterScreen; // Exporta o componente RegisterScreen
