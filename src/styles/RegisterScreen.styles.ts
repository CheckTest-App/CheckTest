import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    padding: 20, // Adiciona espaçamento interno em todos os lados
    backgroundColor: "#e9ecef", // Define uma cor de fundo clara e neutra
  },
  logo: {
    width: 150, // Define a largura do logo
    height: 150, // Define a altura do logo
    marginBottom: 40, // Adiciona um espaço abaixo do logo
    borderRadius: 25, // Bordas arredondadas para o logo
    overflow: "hidden", // Garante que o conteúdo do logo não ultrapasse suas bordas
    resizeMode: "contain", // Garante que o logo mantenha suas proporções sem distorção
  },
  logoText: {
    fontSize: 28, // Define o tamanho da fonte do texto do logo
    fontWeight: "bold", // Define o texto do logo como negrito
    textAlign: "center", // Centraliza o texto do logo horizontalmente
    marginBottom: 40, // Adiciona um espaço abaixo do texto do logo
    color: "#343a40", // Define a cor do texto do logo como um cinza escuro
  },
  inputContainer: {
    flexDirection: "row", // Organiza os itens em linha
    alignItems: "center", // Alinha os itens verticalmente no centro
    width: "100%", // Ocupa 100% da largura disponível
    marginBottom: 15, // Adiciona espaço abaixo do campo de entrada
    borderColor: "#adb5bd", // Cor da borda do campo de entrada
    borderWidth: 1, // Largura da borda do campo de entrada
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
    borderColor: "#adb5bd", // Cor da borda do campo de entrada
    borderWidth: 1, // Largura da borda do campo de entrada
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
  errorText: {
    color: "red", // Define a cor do texto de erro como vermelho
    fontSize: 12, // Tamanho da fonte do texto de erro
    marginTop: 5, // Espaçamento acima do texto de erro
    marginLeft: 5, // Espaçamento à esquerda do texto de erro
  },
  buttonContainer: {
    width: "100%", // Define a largura do contêiner do botão como 100% da largura disponível
    marginBottom: 15, // Espaço abaixo de cada botão
    marginTop: 10, // Espaçamento acima dos botões
    borderRadius: 8, // Bordas arredondadas para o contêiner do botão
  },
  button: {
    backgroundColor: "#007bff", // Cor de fundo azul para os botões
    paddingVertical: 12, // Espaçamento vertical interno do botão
    borderRadius: 8, // Bordas arredondadas para o botão
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente
  },
  buttonText: {
    color: "#fff", // Cor do texto dentro do botão
    fontSize: 16, // Tamanho da fonte do texto
    fontWeight: "bold", // O texto dentro do botão é negrito
  },
  loginButton: {
    marginTop: 10, // Espaçamento acima do botão de login
    backgroundColor: "#0056b3", // Azul escuro para o botão de login
  },
});

export default styles;
