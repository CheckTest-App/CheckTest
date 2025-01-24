import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Estilo do contêiner principal
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f8f9fa", 
    padding: 20, 
  },

  // Estilo do logotipo
  logo: {
    width: 200, 
    height: 200, 
    resizeMode: "contain", 
    marginBottom: 40, 
  },

  // Estilo para a imagem carregada
  uploadedImage: {
    width: "90%", 
    aspectRatio: 1, 
    marginTop: 20, 
    marginBottom: 20, 
    borderRadius: 15, 
    backgroundColor: "#dee2e6", 
    borderWidth: 1, 
    borderColor: "#adb5bd", 
  },

  // Estilo genérico para botões
  button: {
    backgroundColor: "#007bff", 
    paddingVertical: 14, 
    paddingHorizontal: 30, 
    borderRadius: 10, 
    alignItems: "center", 
    justifyContent: "center", 
    width: "85%", 
    marginBottom: 20, 
    elevation: 3, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  // Variações de botões com cores diferentes
  darkBlueButton: {
    backgroundColor: "#0056b3", 
  },

  // Estilo do texto dos botões
  buttonText: {
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold", 
    textAlign: "center", 
    textTransform: "uppercase", 
    letterSpacing: 1, 
  },

  // Estilo do contêiner do modal
  modalContainer: {
    flex: 1, 
    backgroundColor: "rgba(0, 0, 0, 0.9)", 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20, 
  },

  // Estilo do botão de fechar o modal
  closeButton: {
    position: "absolute", 
    top: 40, 
    right: 20, 
    backgroundColor: "#ffffff", 
    padding: 12, 
    borderRadius: 20, 
    elevation: 5, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  // Estilo do texto do botão de fechar
  closeButtonText: {
    color: "#333333", 
    fontSize: 16, 
    fontWeight: "bold", 
  },

  // Estilo da imagem em tela cheia dentro do modal
  fullScreenImage: {
    width: "100%", 
    height: "90%", 
    resizeMode: "contain", 
    borderRadius: 20, 
  },
});

export default styles;