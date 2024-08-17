import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#e6e6e6",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    width: 300, // Tamanho fixo para o campo de entrada
    alignSelf: "center",
    textAlign: "left", // Alinha o texto à esquerda
  },
  passwordContainer: {
    position: "relative", // Torna o contêiner de senha o referencial para o ícone
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
    width: 300, // Tamanho fixo para o campo de senha
    alignSelf: "center",
    justifyContent: "center",
  },
  passwordInput: {
    paddingVertical: 12,
    paddingRight: 50, // Adiciona espaço suficiente para o ícone dentro do campo de senha
    paddingLeft: 15, // Padding à esquerda consistente com o campo de usuário
    fontSize: 16,
    textAlign: "left", // Alinha o texto à esquerda
  },
  iconContainer: {
    position: "absolute",
    right: 15, // Posiciona o ícone à direita, dentro do campo de senha
    top: "50%",
    transform: [{ translateY: -12 }], // Centraliza verticalmente o ícone dentro do campo
  },
  forgotPassword: {
    color: "#007bff",
    textAlign: "center",
    marginBottom: 30,
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    width: 300,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
