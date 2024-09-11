import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    backgroundColor: "#f8f9fa", // Cor de fundo clara e suave
    padding: 20, // Espaçamento interno em todos os lados
  },
  logo: {
    width: 180, // Ajuste na largura do logo para um design mais compacto
    height: 180, // Ajuste na altura do logo para um design mais compacto
    marginBottom: 40, // Aumenta o espaço abaixo do logo para uma melhor separação visual
    resizeMode: "contain", // Mantém as proporções do logo sem distorção
  },
  uploadedImage: {
    width: "90%", // Torna a imagem carregada responsiva à largura do contêiner
    height: undefined, // Permite que a altura seja ajustada automaticamente
    aspectRatio: 1, // Mantém a imagem em formato quadrado
    marginTop: 20, // Espaço acima da imagem carregada
    marginBottom: 20, // Espaço abaixo da imagem carregada para separação dos botões
    borderRadius: 15, // Bordas arredondadas para a imagem, dando um visual moderno
    backgroundColor: "#dee2e6", // Fundo claro para a imagem carregada
    borderWidth: 1, // Borda sutil ao redor da imagem para destaque
    borderColor: "#adb5bd", // Cor da borda levemente contrastante
  },
  button: {
    backgroundColor: "#007bff", // Cor de fundo azul para os botões padrão
    paddingVertical: 14, // Aumenta o espaçamento vertical interno
    paddingHorizontal: 30, // Aumenta o espaçamento horizontal interno
    borderRadius: 10, // Bordas mais arredondadas para um visual suave
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente
    width: "85%", // Define a largura dos botões como 85% da largura do contêiner pai
    marginBottom: 20, // Espaço abaixo de cada botão para melhor separação visual
    elevation: 3, // Leve sombra para dar profundidade ao botão
  },
  darkBlueButton: {
    backgroundColor: "#0056b3", // Cor de fundo azul escuro para o botão específico
  },
  buttonText: {
    color: "#fff", // Cor do texto branca para contraste
    fontSize: 16, // Define o tamanho da fonte do texto dos botões
    fontWeight: "bold", // Texto negrito para maior destaque
    textAlign: "center", // Centraliza o texto dentro dos botões horizontalmente
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)", // Fundo escuro semi-transparente para o modal
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // Espaçamento interno para o conteúdo do modal
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#ffffff",
    padding: 12, // Aumenta o padding para um botão de fechar mais confortável
    borderRadius: 20,
    elevation: 5, // Adiciona uma sombra para destacar o botão
  },
  closeButtonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
  },
  fullScreenImage: {
    width: "100%",
    height: "90%",
    resizeMode: "contain",
    borderRadius: 20,
  },
});

export default styles;
