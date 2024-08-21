import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    padding: 10, // Adiciona espaçamento interno para afastar os elementos das bordas da tela
    backgroundColor: "#f8f9fa", // Define uma cor de fundo clara e suave
  },
  logo: {
    width: 200, // Define a largura do logo
    height: 200, // Define a altura do logo
    marginBottom: 20, // Adiciona um espaço abaixo do logo para separá-lo dos outros elementos
    resizeMode: "contain", // Garante que o logo mantenha suas proporções sem distorção
  },
  imageContainer: {
    flexDirection: "row", // Organiza as imagens em linha
    flexWrap: "wrap", // Permite que as imagens quebrem para a próxima linha se não couberem
    marginTop: 20, // Adiciona espaço acima do contêiner de imagens
    justifyContent: "center", // Centraliza as imagens dentro do contêiner
  },
  uploadedImage: {
    width: 100, // Define a largura da imagem carregada
    height: 100, // Define a altura da imagem carregada
    margin: 5, // Adiciona espaço ao redor de cada imagem
    borderRadius: 10, // Bordas arredondadas para as imagens, dando um visual moderno
    backgroundColor: "#dee2e6", // Fundo claro para as imagens carregadas, destacando-as na tela
  },
  button: {
    backgroundColor: "#007bff", // Cor de fundo azul para os botões padrão
    paddingVertical: 12, // Adiciona espaçamento vertical interno para aumentar a altura do botão
    paddingHorizontal: 20, // Adiciona espaçamento horizontal interno
    borderRadius: 8, // Bordas arredondadas para os botões, criando um visual suave
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente
    width: "80%", // Define a largura dos botões como 80% da largura do contêiner pai
    marginTop: 20, // Adiciona espaço acima de cada botão
  },
  darkBlueButton: {
    backgroundColor: "#0056b3", // Cor de fundo azul escuro para o botão específico
  },
  lightRedButton: {
    backgroundColor: "#ff6b6b", // Cor de fundo vermelho claro para o botão específico
  },
  buttonText: {
    color: "#fff", // Cor do texto dentro dos botões é branca para contraste
    fontSize: 16, // Define o tamanho da fonte do texto dos botões
    fontWeight: "bold", // O texto dentro dos botões é negrito
    textAlign: "center", // Centraliza o texto dentro dos botões horizontalmente
  },
});

export default styles;
