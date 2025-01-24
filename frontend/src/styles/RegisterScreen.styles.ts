import { StyleSheet, ViewStyle } from "react-native";

// Estilo comum para contêineres de inputs
const commonInputContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  maxWidth: 400,  // Limita o tamanho em telas maiores
  borderColor: "#adb5bd",
  borderWidth: 1,
  borderRadius: 8,
  backgroundColor: "#fff",
  paddingHorizontal: 12,
  elevation: 3, // Sombra leve para Android
  shadowColor: "#000", // Sombra para iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  marginBottom: 20,
};

const styles = StyleSheet.create({
  // Estilo principal da tela
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#e9ecef",
  },

  // Estilo do logo
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 40,
  },

  // Contêiner de inputs para melhor separação visual
  inputWrapper: {
    width: "100%",
    maxWidth: 400,
    marginBottom: 20, // Maior espaçamento entre campos
  },

  // Estilo dos inputs
  inputContainer: {
    ...commonInputContainer,
  },

  // Estilo específico do contêiner de senha
  passwordContainer: {
    ...commonInputContainer,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    paddingVertical: 10,
    color: "#495057",
    fontSize: 16,
    textAlign: "left",
    backgroundColor: "#fff", // Garante visibilidade do input
    borderRadius: 8,
  },

  // Estilo do ícone de olho dentro do campo de senha
  eyeIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  eyeIconText: {
    fontSize: 20,
    color: "#495057",
  },

  // Mensagem de erro de validação de campos
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
    textAlign: "left",
  },

  // Contêiner de botões para organização
  buttonContainer: {
    width: "80%",
    maxWidth: 400,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 8,
  },

  // Estilo padrão dos botões
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 400,
    marginTop: 20,
  },

  // Estilo específico para o botão azul escuro (Login)
  darkBlueButton: {
    backgroundColor: "#0056b3",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  // Botão de login com espaçamento superior adicional
  loginButton: {
    marginTop: 10,
  },
});

export default styles;