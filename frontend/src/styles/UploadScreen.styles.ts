import { StyleSheet, Dimensions } from "react-native"; // Importa os módulos StyleSheet e Dimensions do React Native.

const { width: screenWidth } = Dimensions.get("window"); // Obtém a largura da tela para uso em estilos responsivos.

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz com que o contêiner ocupe toda a tela.
    justifyContent: "center", // Alinha o conteúdo verticalmente no centro da tela.
    alignItems: "center", // Alinha o conteúdo horizontalmente no centro da tela.
    padding: 10, // Adiciona um espaçamento interno de 10 unidades em todos os lados do contêiner.
    backgroundColor: "#f8f9fa", // Define uma cor de fundo clara e suave para o contêiner.
  },
  logo: {
    width: 200, // Define a largura do logo como 150 unidades.
    height: 200, // Define a altura do logo como 150 unidades.
    resizeMode: "contain", // Faz com que o logo mantenha suas proporções ao ser redimensionado dentro do espaço disponível.
    marginBottom: 40,
  },
  imageContainer: {
    flexDirection: "row", // Organiza os itens em linha horizontalmente.
    flexWrap: "wrap", // Permite que os itens quebrem a linha para a próxima linha, se necessário.
    marginTop: 20, // Adiciona um espaçamento de 20 unidades acima do contêiner de imagens.
    justifyContent: "center", // Alinha os itens horizontalmente no centro do contêiner.
  },
  uploadedImage: {
    width: 100, // Define a largura de cada imagem carregada como 100 unidades.
    height: 100, // Define a altura de cada imagem carregada como 100 unidades.
    margin: 5, // Adiciona um espaçamento de 5 unidades ao redor de cada imagem carregada.
    borderRadius: 10, // Define bordas arredondadas para a imagem carregada.
    backgroundColor: "#dee2e6", // Define um fundo claro para a área ao redor da imagem carregada.
  },
  button: {
    backgroundColor: "#007bff", // Define a cor de fundo azul para os botões padrão.
    paddingVertical: 12, // Adiciona um espaçamento interno vertical de 12 unidades ao botão.
    paddingHorizontal: 20, // Adiciona um espaçamento interno horizontal de 20 unidades ao botão.
    borderRadius: 8, // Define bordas arredondadas para o botão.
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente.
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente.
    width: "80%", // Define a largura do botão como 80% da largura do contêiner pai.
    marginTop: 20, // Adiciona um espaçamento de 20 unidades acima do botão.
  },
  darkBlueButton: {
    backgroundColor: "#0056b3", // Define a cor de fundo azul escuro para um botão específico.
  },
  lightRedButton: {
    backgroundColor: "#ff6b6b", // Define a cor de fundo vermelho claro para um botão específico.
  },
  buttonText: {
    color: "#fff", // Define a cor do texto do botão como branca para contraste.
    fontSize: 16, // Define o tamanho da fonte do texto dos botões como 16 unidades.
    fontWeight: "bold", // Define o texto do botão em negrito para maior destaque.
    textAlign: "center", // Centraliza o texto dentro dos botões horizontalmente.
  },
  modalContainer: {
    flex: 1, // Faz com que o contêiner do modal ocupe toda a tela.
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Define um fundo escuro semi-transparente para o modal.
    justifyContent: "center", // Alinha o conteúdo verticalmente no centro do modal.
    alignItems: "center", // Alinha o conteúdo horizontalmente no centro do modal.
  },
  closeButton: {
    position: "absolute", // Posiciona o botão de fechar de forma absoluta dentro do modal.
    bottom: 30, // Define a posição do botão 30 unidades a partir do fundo do modal.
    alignSelf: "center", // Centraliza o botão horizontalmente dentro do modal.
    backgroundColor: "#ffffff", // Define a cor de fundo do botão de fechar como branca.
    padding: 12, // Adiciona um espaçamento interno de 12 unidades ao botão de fechar.
    borderRadius: 20, // Define bordas arredondadas para o botão de fechar.
    elevation: 5, // Adiciona uma sombra para destacar o botão de fechar.
  },
  closeButtonText: {
    color: "#333333", // Define a cor do texto do botão de fechar como cinza escuro.
    fontSize: 16, // Define o tamanho da fonte do texto do botão de fechar como 16 unidades.
    fontWeight: "bold", // Define o texto do botão de fechar em negrito para maior destaque.
  },
  fullScreenImage: {
    width: screenWidth, // Faz com que a imagem ocupe toda a largura da tela.
    height: "90%", // Define a altura da imagem como 90% da altura da tela.
    resizeMode: "contain", // Garante que a imagem mantenha suas proporções ao ser redimensionada.
    borderRadius: 20, // Define bordas arredondadas para a imagem, dando um visual moderno e suave.
  },
  paginationContainer: {
    flexDirection: "row", // Organiza os itens de paginação em linha horizontal.
    justifyContent: "space-between", // Distribui os itens de paginação com espaço entre eles.
    width: "80%", // Define a largura do contêiner de paginação como 80% da largura do contêiner pai.
    marginTop: 20, // Adiciona um espaçamento de 20 unidades acima do contêiner de paginação.
  },
  paginationButton: {
    flex: 1, // Faz com que cada botão de paginação ocupe o espaço disponível igualmente.
    marginHorizontal: 5, // Adiciona um espaçamento horizontal de 5 unidades entre os botões de paginação.
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default styles; // Exporta os estilos para serem utilizados em outros componentes.