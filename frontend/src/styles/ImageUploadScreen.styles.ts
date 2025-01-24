import { StyleSheet } from "react-native"; // Importa o módulo StyleSheet do React Native para criar estilos.

const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz com que o contêiner ocupe toda a tela, expandindo para preencher o espaço disponível.
    justifyContent: "center", // Alinha o conteúdo verticalmente no centro da tela.
    alignItems: "center", // Alinha o conteúdo horizontalmente no centro da tela.
    backgroundColor: "#f8f9fa", // Define uma cor de fundo clara e suave para o contêiner.
    padding: 20, // Adiciona um espaçamento interno de 20 unidades em todos os lados do contêiner.
  },
  logo: {
    width: 200, // Define a largura do logo como 150 unidades.
    height: 200, // Define a altura do logo como 150 unidades.
    resizeMode: "contain", // Faz com que o logo mantenha suas proporções ao ser redimensionado dentro do espaço disponível.
    marginBottom: 40,
  },
  uploadedImage: {
    width: "90%", // Faz com que a imagem carregada ocupe 90% da largura do contêiner pai, tornando-a responsiva.
    height: undefined, // Permite que a altura da imagem seja ajustada automaticamente, baseada na proporção e no tamanho do contêiner.
    aspectRatio: 1, // Mantém a imagem em formato quadrado, com a largura igual à altura.
    marginTop: 20, // Adiciona um espaçamento de 20 unidades acima da imagem carregada.
    marginBottom: 20, // Adiciona um espaçamento de 20 unidades abaixo da imagem carregada para separar dos botões.
    borderRadius: 15, // Define bordas arredondadas para a imagem, dando um visual moderno e suave.
    backgroundColor: "#dee2e6", // Define uma cor de fundo clara para a área ao redor da imagem carregada.
    borderWidth: 1, // Adiciona uma borda sutil de 1 unidade ao redor da imagem para destaque.
    borderColor: "#adb5bd", // Define a cor da borda como um tom de cinza levemente contrastante.
  },
  button: {
    backgroundColor: "#007bff", // Define a cor de fundo azul para os botões padrão.
    paddingVertical: 14, // Adiciona um espaçamento interno vertical de 14 unidades ao botão.
    paddingHorizontal: 30, // Adiciona um espaçamento interno horizontal de 30 unidades ao botão.
    borderRadius: 10, // Define bordas arredondadas para o botão, proporcionando um visual suave.
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente.
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente.
    width: "85%", // Define a largura dos botões como 85% da largura do contêiner pai.
    marginBottom: 20, // Adiciona um espaçamento de 20 unidades abaixo de cada botão para melhor separação visual.
    elevation: 3, // Adiciona uma sombra leve para dar uma sensação de profundidade ao botão.
  },
  darkBlueButton: {
    backgroundColor: "#0056b3", // Define a cor de fundo azul escuro para um botão específico.
  },
  buttonText: {
    color: "#fff", // Define a cor do texto do botão como branca para contraste.
    fontSize: 16, // Define o tamanho da fonte do texto dos botões como 16 unidades.
    fontWeight: "bold", // Define o texto do botão em negrito para maior destaque.
    textAlign: "center", // Centraliza o texto dentro dos botões horizontalmente.
  },
  modalContainer: {
    flex: 1, // Faz com que o contêiner do modal ocupe toda a tela.
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Define um fundo escuro semi-transparente para o modal, cobrindo quase toda a tela.
    justifyContent: "center", // Alinha o conteúdo verticalmente no centro do modal.
    alignItems: "center", // Alinha o conteúdo horizontalmente no centro do modal.
    padding: 20, // Adiciona um espaçamento interno de 20 unidades ao conteúdo do modal.
  },
  closeButton: {
    position: "absolute", // Posiciona o botão de fechar de forma absoluta dentro do modal.
    top: 40, // Define a posição do botão 40 unidades a partir do topo do modal.
    right: 20, // Define a posição do botão 20 unidades a partir da borda direita do modal.
    backgroundColor: "#ffffff", // Define a cor de fundo do botão de fechar como branca.
    padding: 12, // Adiciona um espaçamento interno de 12 unidades ao botão de fechar.
    borderRadius: 20, // Define bordas arredondadas para o botão de fechar, criando um visual mais suave.
    elevation: 5, // Adiciona uma sombra mais pronunciada para destacar o botão de fechar.
  },
  closeButtonText: {
    color: "#333333", // Define a cor do texto do botão de fechar como um tom de cinza escuro.
    fontSize: 16, // Define o tamanho da fonte do texto do botão de fechar como 16 unidades.
    fontWeight: "bold", // Define o texto do botão de fechar em negrito para maior destaque.
  },
  fullScreenImage: {
    width: "100%", // Faz com que a imagem ocupe 100% da largura da tela.
    height: "90%", // Define a altura da imagem como 90% da altura da tela, permitindo que ocupe a maior parte da tela.
    resizeMode: "contain", // Garante que a imagem mantenha suas proporções ao ser redimensionada dentro do espaço disponível.
    borderRadius: 20, // Define bordas arredondadas para a imagem, dando um visual moderno e suave.
  },
});

export default styles; // Exporta os estilos para serem utilizados em outros componentes.
