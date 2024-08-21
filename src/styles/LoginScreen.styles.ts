import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    padding: 20, // Adiciona espaçamento interno em todos os lados
    backgroundColor: "#e9ecef", // Define uma cor de fundo clara e suave
  },
  logo: {
    width: 150, // Define a largura do logo
    height: 150, // Define a altura do logo
    marginBottom: 40, // Adiciona um espaço abaixo do logo
    resizeMode: "contain", // Garante que o logo mantenha suas proporções sem distorção
  },
  inputContainer: {
    flexDirection: "row", // Organiza os itens em linha
    alignItems: "center", // Alinha os itens verticalmente no centro
    width: "100%", // Ocupa 100% da largura disponível
    marginBottom: 15, // Adiciona espaço abaixo do campo de entrada
    borderColor: "#adb5bd", // Cor da borda
    borderWidth: 1, // Largura da borda
    borderRadius: 8, // Bordas arredondadas para um visual mais suave
    backgroundColor: "#fff", // Fundo branco para o campo de entrada
    paddingHorizontal: 10, // Espaçamento interno nas laterais
    elevation: 2, // Sombra para destacar o campo de entrada
  },
  passwordContainer: {
    flexDirection: "row", // Organiza os itens em linha, semelhante a `inputContainer`
    alignItems: "center", // Alinha os itens verticalmente no centro
    width: "100%", // Ocupa 100% da largura disponível
    marginBottom: 15, // Adiciona espaço abaixo do campo de entrada
    borderColor: "#adb5bd", // Cor da borda
    borderWidth: 1, // Largura da borda
    borderRadius: 8, // Bordas arredondadas para um visual mais suave
    backgroundColor: "#fff", // Fundo branco para o campo de entrada
    paddingHorizontal: 10, // Espaçamento interno nas laterais
    elevation: 2, // Sombra para destacar o campo de entrada
  },
  input: {
    flex: 1, // O campo de entrada ocupa todo o espaço disponível
    paddingVertical: 10, // Espaçamento vertical dentro do campo de entrada
    color: "#495057", // Cor do texto dentro do campo de entrada
  },
  eyeIcon: {
    justifyContent: "center", // Centraliza o ícone verticalmente
    alignItems: "center", // Centraliza o ícone horizontalmente
    marginLeft: 10, // Adiciona espaço à esquerda do ícone
  },
  eyeIconText: {
    fontSize: 18, // Tamanho da fonte do ícone de olho
    color: "#495057", // Cor do ícone de olho
  },
  forgotPasswordText: {
    color: "#007bff", // Cor do texto de "Esqueci a senha"
    marginBottom: 20, // Espaço abaixo do texto
    textAlign: "center", // Centraliza o texto horizontalmente
  },
  buttonContainer: {
    width: "80%", // Define a largura dos botões como 80% da largura da tela
    marginBottom: 20, // Espaço abaixo de cada botão
    marginTop: 10, // Espaço acima dos botões
    borderRadius: 8, // Bordas arredondadas para o contêiner do botão
  },
  button: {
    backgroundColor: "#007bff", // Cor de fundo azul padrão para os botões
    paddingVertical: 12, // Espaçamento vertical interno do botão
    borderRadius: 8, // Bordas arredondadas para o botão
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente
  },
  darkBlueButton: {
    backgroundColor: "#0056b3", // Cor de fundo azul escuro para o botão de login
  },
  buttonText: {
    color: "#fff", // Cor do texto dentro do botão
    fontSize: 16, // Tamanho da fonte do texto
    fontWeight: "bold", // O texto dentro do botão é negrito
  },
});

export default styles;
