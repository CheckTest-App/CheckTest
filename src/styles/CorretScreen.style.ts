import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    padding: 20, // Adiciona espaçamento interno em todos os lados
    backgroundColor: "#f8f9fa", // Define uma cor de fundo suave e clara
  },
  logo: {
    width: 200, // Define a largura do logo
    height: 200, // Define a altura do logo
    marginBottom: 30, // Adiciona um espaço abaixo do logo
    resizeMode: "contain", // Redimensiona o logo para caber dentro dos limites sem distorção
  },
  buttonContainer: {
    width: "80%", // Define a largura dos botões como 80% da largura da tela
    marginBottom: 20, // Adiciona um espaço abaixo de cada botão
  },
  button: {
    backgroundColor: "#007bff", // Define a cor de fundo do botão como azul para os botões padrão
    paddingVertical: 12, // Adiciona espaço interno na vertical para aumentar a altura do botão
    paddingHorizontal: 20, // Adiciona espaço interno na horizontal
    borderRadius: 8, // Define bordas arredondadas para o botão
    alignItems: "center", // Centraliza o texto dentro do botão horizontalmente
    justifyContent: "center", // Centraliza o texto dentro do botão verticalmente
  },
  emailButton: {
    backgroundColor: "#28a745", // Define a cor de fundo verde claro para o botão de enviar para email
  },
  backButton: {
    backgroundColor: "#ff6b6b", // Define a cor de fundo vermelho claro para o botão de voltar para envio de provas
  },
  logoutButton: {
    backgroundColor: "#dc3545", // Define a cor de fundo vermelha para o botão de logout, indicando uma ação crítica
  },
  buttonText: {
    color: "#fff", // Define a cor do texto do botão como branca
    fontSize: 16, // Define o tamanho da fonte do texto
    fontWeight: "bold", // Define o peso da fonte como negrito
    textAlign: "center", // Centraliza o texto dentro do botão
  },
});

export default styles;
