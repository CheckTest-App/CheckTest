import { StyleSheet } from "react-native"; // Importa o módulo StyleSheet do React Native para criar estilos.

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz com que o contêiner ocupe todo o espaço disponível na tela.
    justifyContent: "center", // Centraliza o conteúdo verticalmente no meio da tela.
    alignItems: "center", // Centraliza o conteúdo horizontalmente no meio da tela.
    padding: 20, // Adiciona um espaçamento interno de 20 unidades em todos os lados.
    backgroundColor: "#f8f9fa", // Define uma cor de fundo suave e clara (cinza claro).
  },
  logo: {
    width: 150, // Define a largura do logo como 150 unidades.
    height: 150, // Define a altura do logo como 150 unidades.
    marginBottom: 40, // Adiciona um espaçamento de 40 unidades abaixo do logo.
    resizeMode: "contain", // Faz com que o logo mantenha suas proporções ao ser redimensionado.
    backgroundColor: "#007bff", // Define a cor de fundo azul ao redor do logo.
    borderRadius: 75, // Define bordas arredondadas para o fundo azul, criando um efeito circular.
    padding: 20, // Adiciona um espaçamento interno de 20 unidades ao redor do logo para dar margem ao conteúdo.
  },
  buttonContainer: {
    width: "80%", // Define a largura do contêiner dos botões como 80% da largura da tela.
    marginBottom: 20, // Adiciona um espaçamento de 20 unidades abaixo de cada botão.
  },
  button: {
    backgroundColor: "#007bff", // Define a cor de fundo padrão dos botões como azul.
    paddingVertical: 12, // Adiciona 12 unidades de espaçamento interno vertical para aumentar a altura do botão.
    paddingHorizontal: 20, // Adiciona 20 unidades de espaçamento interno horizontal.
    borderRadius: 8, // Define bordas arredondadas para o botão com raio de 8 unidades.
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente.
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente.
  },
  emailButton: {
    backgroundColor: "#28a745", // Define a cor de fundo verde claro para o botão de enviar por email.
  },
  backButton: {
    backgroundColor: "#ff6b6b", // Define a cor de fundo vermelho claro para o botão de voltar para envio de provas.
  },
  logoutButton: {
    backgroundColor: "#dc3545", // Define a cor de fundo vermelha para o botão de logout, indicando uma ação crítica.
  },
  buttonText: {
    color: "#fff", // Define a cor do texto dos botões como branca.
    fontSize: 16, // Define o tamanho da fonte do texto dos botões como 16 unidades.
    fontWeight: "bold", // Define o peso da fonte como negrito para destacar o texto.
    textAlign: "center", // Centraliza o texto dentro do botão horizontalmente.
  },
});

export default styles; // Exporta os estilos para serem usados em outros componentes.
