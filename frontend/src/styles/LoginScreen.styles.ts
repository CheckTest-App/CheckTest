import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível verticalmente
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    padding: 20, // Espaçamento interno
    backgroundColor: "#e9ecef", // Cor de fundo cinza claro
  },
  logo: {
    width: 150, // Largura do logo
    height: 150, // Altura do logo
    marginBottom: 40, // Espaçamento abaixo do logo
    resizeMode: "contain", // Garante que o logo mantenha suas proporções
    backgroundColor: "#007bff", // Define o fundo azul ao redor do logo
    borderRadius: 75, // Bordas arredondadas para criar um fundo circular
    padding: 20, // Espaçamento interno ao redor do logo para dar margem ao conteúdo
  },
  inputContainer: {
    flexDirection: "row", // Organiza o conteúdo em linha
    alignItems: "center", // Alinha os itens verticalmente no centro
    width: "100%", // O campo de entrada ocupa toda a largura disponível
    marginBottom: 15, // Espaçamento abaixo do campo de entrada
    borderColor: "#adb5bd", // Cor da borda
    borderWidth: 1, // Largura da borda
    borderRadius: 8, // Bordas arredondadas
    backgroundColor: "#fff", // Fundo branco para o campo de entrada
    paddingHorizontal: 10, // Espaçamento interno nas laterais
    elevation: 2, // Sombra para dar destaque ao campo
  },
  passwordContainer: {
    flexDirection: "row", // Organiza o conteúdo em linha, semelhante ao inputContainer
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
    borderColor: "#adb5bd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    elevation: 2,
  },
  input: {
    flex: 1, // O campo de entrada ocupa todo o espaço disponível
    paddingVertical: 10, // Espaçamento vertical dentro do campo
    color: "#495057", // Cor do texto dentro do campo de entrada
  },
  eyeIcon: {
    justifyContent: "center", // Centraliza o ícone verticalmente
    alignItems: "center", // Centraliza o ícone horizontalmente
    marginLeft: 10, // Espaçamento à esquerda do ícone
  },
  eyeIconText: {
    fontSize: 18, // Tamanho da fonte do ícone de olho
    color: "#495057", // Cor do ícone de olho
  },
  forgotPasswordText: {
    color: "#007bff", // Cor do texto de "Esqueci a senha"
    marginBottom: 20, // Espaçamento abaixo do texto
    textAlign: "center", // Centraliza o texto horizontalmente
  },
  buttonContainer: {
    width: "80%", // O contêiner do botão ocupa 80% da largura da tela
    marginBottom: 20, // Espaçamento abaixo do botão
    marginTop: 10, // Espaçamento acima do botão
    borderRadius: 8, // Bordas arredondadas
  },
  button: {
    backgroundColor: "#007bff", // Cor de fundo azul para os botões
    paddingVertical: 12, // Espaçamento vertical interno dos botões
    borderRadius: 8, // Bordas arredondadas
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente
  },
  darkBlueButton: {
    backgroundColor: "#0056b3", // Cor de fundo azul escuro para o botão de login
  },
  buttonText: {
    color: "#fff", // Cor do texto dentro do botão (branco)
    fontSize: 16, // Tamanho da fonte do texto
    fontWeight: "bold", // O texto dentro do botão é negrito
  },
});

export default styles;
