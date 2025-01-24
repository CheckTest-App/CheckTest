import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f8f9fa",
  },

  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 30,
  },

  buttonContainer: {
    width: "100%",
    maxWidth: 350, // Define um limite para evitar botões muito largos em telas grandes
    alignItems: "center",
    marginBottom: 15, // Espaçamento entre botões
  },

  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  blueButton: {
    backgroundColor: "#007bff",
  },

  greenButton: {
    backgroundColor: "#28a745",
  },

  lightRedButton: {
    backgroundColor: "#ff6b6b",
  },

  darkRedButton: {
    backgroundColor: "#dc3545",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  infoText: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default styles;