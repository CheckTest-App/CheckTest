import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Contêiner principal da tela
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e9ecef", 
  },

  // Estilo do logo
  logo: {
    width: 200, 
    height: 200, 
    resizeMode: "contain", 
    marginBottom: 40, // Espaço abaixo do logo
  },

  // Contêiner dos inputs
  inputContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%", 
    marginBottom: 15, 
    borderColor: "#adb5bd", 
    borderWidth: 1, 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    paddingHorizontal: 10, 
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
  },

  // Contêiner específico para o campo de senha
  passwordContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    width: "100%", 
    marginBottom: 15, 
    borderColor: "#adb5bd", 
    borderWidth: 1, 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    paddingHorizontal: 10, 
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
  },

  // Estilo do campo de entrada
  input: {
    flex: 1, 
    paddingVertical: 12, 
    color: "#495057", 
    fontSize: 16, 
  },

  // Ícone do olho no campo de senha
  eyeIcon: {
    justifyContent: "center", 
    alignItems: "center", 
    marginLeft: 10, 
  },

  // Estilo do ícone de olho
  eyeIconText: {
    fontSize: 18, 
    color: "#495057", 
  },

  // Texto de "Esqueci a senha"
  forgotPasswordText: {
    color: "#007bff", 
    marginBottom: 20, 
    textAlign: "center", 
    fontSize: 14, 
    fontWeight: "500", 
  },

  // Contêiner para o botão principal
  buttonContainer: {
    width: "80%", 
    marginVertical: 15, // Espaçamento acima e abaixo do botão
    borderRadius: 8, 
  },

  // Estilo padrão dos botões
  button: {
    backgroundColor: "#007bff", 
    paddingVertical: 14, 
    borderRadius: 8, 
    alignItems: "center", 
    justifyContent: "center", 
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
  },

  // Botão de ação alternativa com cor azul escuro
  darkBlueButton: {
    backgroundColor: "#0056b3", 
  },

  // Estilo do texto do botão
  buttonText: {
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold", 
    textAlign: "center", 
    textTransform: "uppercase", 
    letterSpacing: 1, 
  },
});

export default styles;