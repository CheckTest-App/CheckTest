import React, { useContext, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";
import logoBase64 from "../assets/logoBase64"; // Importe a string Base64
import { UserContext } from "../contexts/UserContext"; // Importa o contexto de usuário para usar os dados de usuário
import { LoginScreenNavigationProp } from "../navigation/types"; // Tipagem para a navegação
import CustomAlert from "../components/CustomAlert"; // Componente de alerta customizado para mostrar erros
import styles from "../styles/LoginScreen.styles"; // Importa os estilos para a tela de login

// Tipagem das props que o componente receberá
type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  // Obtém o contexto do usuário
  const userContext = useContext(UserContext);

  // Verifica se o UserContext está disponível corretamente
  if (!userContext) {
    throw new Error("UserContext must be used dentro de UserProvider");
  }

  // Desestruturação para pegar a lista de usuários do contexto
  const { users } = userContext;

  // Estados para armazenar o nome de usuário, senha, visibilidade do campo de senha, e controle de alertas
  const [username, setUsername] = useState(""); // Estado para o nome de usuário
  const [password, setPassword] = useState(""); // Estado para a senha
  const [secureTextEntry, setSecureTextEntry] = useState(true); // Estado para esconder ou mostrar a senha
  const [alertVisible, setAlertVisible] = useState(false); // Estado para controlar a visibilidade do alerta
  const [alertMessage, setAlertMessage] = useState(""); // Estado para armazenar a mensagem de erro no alerta

  // Função que realiza a tentativa de login
  const handleLogin = () => {
    const user = users.find(
      (u: { username: string; password: string }) =>
        u.username === username && u.password === password
    );

    if (user) {
      if (userContext.setLoggedInUser) {
        userContext.setLoggedInUser(user); // Define o usuário como logado
      }
      navigation.navigate("ImageUpload");
    } else {
      setAlertMessage("Nome de usuário ou senha incorretos!");
      setAlertVisible(true);
    }
  };

  // Retorna o layout da tela de login
  return (
    <View style={styles.container}>
      {/* Componente de alerta customizado para exibir mensagens de erro */}
      <CustomAlert
        visible={alertVisible} // Controla a visibilidade do alerta
        title="Erro" // Título do alerta
        message={alertMessage} // Mensagem do alerta (ex: erro de autenticação)
        onClose={() => setAlertVisible(false)} // Fecha o alerta ao clicar
      />

      {/* Exibe o logo da aplicação */}
      <Image source={{ uri: logoBase64 }} style={styles.logo} />

      {/* Campo de entrada para o nome de usuário */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input} // Estilo aplicado ao campo de entrada
          placeholder="Usuário" // Texto placeholder no campo de entrada
          value={username} // Valor do campo controlado pelo estado `username`
          onChangeText={setUsername} // Atualiza o valor de `username` quando o usuário digita
          placeholderTextColor="#6c757d" // Cor do placeholder
        />
      </View>

      {/* Campo de entrada para a senha */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input} // Estilo aplicado ao campo de senha
          placeholder="Senha" // Texto placeholder
          secureTextEntry={secureTextEntry} // Esconde a senha se `secureTextEntry` for true
          value={password} // Valor do campo de senha controlado pelo estado `password`
          onChangeText={setPassword} // Atualiza o valor de `password` quando o usuário digita
          placeholderTextColor="#6c757d" // Cor do placeholder
        />
        {/* Botão para alternar entre mostrar ou esconder a senha */}
        <TouchableOpacity
          style={styles.eyeIcon} // Estilo do ícone de olho
          onPress={() => setSecureTextEntry(!secureTextEntry)} // Alterna a visibilidade da senha
        >
          <Text style={styles.eyeIconText}>
            {secureTextEntry ? "👁️" : "🙈"}{" "}
            {/* Mostra um ícone diferente dependendo do estado */}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Texto "Esqueci a senha" (não tem funcionalidade neste exemplo) */}
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
      </TouchableOpacity>

      {/* Botão para navegar para a tela de cadastro */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button} // Estilo aplicado ao botão
          onPress={() => navigation.navigate("Register")} // Navega para a tela de cadastro
        >
          <Text style={styles.buttonText}>Cadastrar-se</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para realizar o login */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.darkBlueButton]} // Estilo aplicado ao botão de login
          onPress={handleLogin} // Chama a função de login quando o botão é clicado
        >
          <Text style={styles.buttonText}>Fazer login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
