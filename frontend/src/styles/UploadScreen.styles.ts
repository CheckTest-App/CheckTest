import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },

  button: {
    width: "100%",
    height: 50,  // Definição de altura consistente para todos os botões
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  buttonContainer: {
    width: "100%",
    maxWidth: 350,  // Limite de largura para telas grandes
    alignItems: "center",
    marginBottom: 15, // Espaçamento entre os botões
  },

  blueButton: {
    backgroundColor: "#007bff",
  },

  greenButton: {
    backgroundColor: "#28a745",
  },

  redButton: {
    backgroundColor: "#ff6b6b",
  },

  paginationButton: {
    backgroundColor: "#6c757d",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },

  uploadedImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: 350,
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  fullScreenImage: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "60%",
  },

  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
