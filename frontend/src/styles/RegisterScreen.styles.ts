import { StyleSheet } from "react-native"; // Importa o módulo StyleSheet do React Native para criar estilos.

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz com que o contêiner ocupe toda a tela, expandindo para preencher o espaço disponível.
    justifyContent: "center", // Alinha o conteúdo verticalmente no centro da tela.
    alignItems: "center", // Alinha o conteúdo horizontalmente no centro da tela.
    padding: 20, // Adiciona um espaçamento interno de 20 unidades em todos os lados do contêiner.
    backgroundColor: "#e9ecef", // Define uma cor de fundo cinza claro para o contêiner.
  },
  logo: {
    width: 200, // Define a largura do logo como 150 unidades.
    height: 200, // Define a altura do logo como 150 unidades.
    resizeMode: "contain", // Faz com que o logo mantenha suas proporções ao ser redimensionado dentro do espaço disponível.
    marginBottom: 40,
  },
  inputWrapper: {
    width: "100%", // Faz com que o contêiner do campo de entrada ocupe toda a largura disponível.
    marginBottom: 5, // Adiciona um pequeno espaçamento de 5 unidades entre os campos de entrada.
  },
  inputContainer: {
    flexDirection: "row", // Organiza os itens dentro do contêiner em uma linha horizontal.
    alignItems: "center", // Alinha os itens verticalmente no centro.
    width: "100%", // Faz com que o contêiner do campo de entrada ocupe toda a largura disponível.
    borderColor: "#adb5bd", // Define a cor da borda do campo de entrada como cinza.
    borderWidth: 1, // Define a largura da borda como 1 unidade.
    borderRadius: 8, // Define bordas arredondadas para o campo de entrada.
    backgroundColor: "#fff", // Define o fundo branco para o campo de entrada.
    paddingHorizontal: 10, // Adiciona um espaçamento interno de 10 unidades nas laterais do campo de entrada.
    elevation: 2, // Adiciona uma sombra leve para dar um leve destaque ao campo de entrada.
  },
  passwordContainer: {
    flexDirection: "row", // Semelhante ao inputContainer, organiza os itens em linha horizontal.
    alignItems: "center", // Alinha os itens verticalmente no centro.
    width: "100%", // Faz com que o contêiner de senha ocupe toda a largura disponível.
    borderColor: "#adb5bd", // Define a cor da borda do contêiner de senha como cinza.
    borderWidth: 1, // Define a largura da borda como 1 unidade.
    borderRadius: 8, // Define bordas arredondadas para o contêiner de senha.
    backgroundColor: "#fff", // Define o fundo branco para o contêiner de senha.
    paddingHorizontal: 10, // Adiciona um espaçamento interno de 10 unidades nas laterais do contêiner de senha.
    elevation: 2,
    marginBottom: 5, // Adiciona uma sombra leve para dar um leve destaque ao contêiner de senha.
  },
  input: {
    flex: 1, // Faz com que o campo de entrada ocupe todo o espaço disponível dentro do contêiner.
    paddingVertical: 10, // Adiciona um espaçamento interno vertical de 10 unidades no campo de entrada.
    color: "#495057", // Define a cor do texto dentro do campo de entrada como um tom de cinza escuro.
  },
  eyeIcon: {
    justifyContent: "center", // Centraliza o ícone verticalmente dentro do contêiner.
    alignItems: "center", // Centraliza o ícone horizontalmente dentro do contêiner.
    marginLeft: 10, // Adiciona um espaçamento de 10 unidades à esquerda do ícone.
  },
  eyeIconText: {
    fontSize: 18, // Define o tamanho da fonte do ícone de olho como 18 unidades.
    color: "#495057", // Define a cor do ícone de olho como um tom de cinza escuro.
  },
  errorText: {
    color: "red", // Define a cor do texto de erro como vermelha para indicar um problema.
    fontSize: 12, // Define o tamanho da fonte do texto de erro como 12 unidades.
    marginTop: 5, // Adiciona um espaçamento de 5 unidades acima do texto de erro.
    marginBottom: 5, // Adiciona um espaçamento de 5 unidades abaixo do texto de erro.
    width: "100%", // Faz com que o texto de erro ocupe toda a largura disponível.
    textAlign: "left", // Alinha o texto de erro à esquerda dentro do contêiner.
  },
  buttonContainer: {
    width: "80%", // Define a largura do contêiner dos botões como 80% da largura da tela.
    marginTop: 10, // Adiciona um espaçamento de 10 unidades acima do contêiner dos botões.
    marginBottom: 20, // Adiciona um espaçamento de 20 unidades abaixo do contêiner dos botões.
    borderRadius: 8, // Define bordas arredondadas para o contêiner dos botões.
  },
  button: {
    backgroundColor: "#007bff", // Define a cor de fundo azul para os botões.
    paddingVertical: 12, // Adiciona um espaçamento interno vertical de 12 unidades ao botão.
    width: "100%", // Faz com que o botão ocupe toda a largura disponível dentro do contêiner.
    borderRadius: 8, // Define bordas arredondadas para o botão.
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente.
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente.
    marginTop: 20, // Adiciona um espaçamento de 20 unidades entre o campo Confirmar Senha e o botão Registrar.
  },
  darkBlueButton: {
    backgroundColor: "#0056b3", // Define a cor de fundo azul escuro para o botão de login.
    width: "100%", // Faz com que o botão ocupe toda a largura disponível.
  },
  buttonText: {
    color: "#fff", // Define a cor do texto do botão como branca.
    fontSize: 16, // Define o tamanho da fonte do texto do botão como 16 unidades.
    fontWeight: "bold", // Define o texto do botão em negrito para destacá-lo.
  },
  loginButton: {
    marginTop: 10, // Adiciona um espaçamento de 10 unidades acima do botão de login.
  },
});

export default styles; // Exporta os estilos para serem utilizados em outros componentes.
