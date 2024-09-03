import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: "contain",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    justifyContent: "center",
  },
  uploadedImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#dee2e6",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginTop: 20,
  },
  darkBlueButton: {
    backgroundColor: "#0056b3",
  },
  lightRedButton: {
    backgroundColor: "#ff6b6b",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    bottom: 30, // Posição ajustada para estar visível na tela
    alignSelf: "center", // Centralizado horizontalmente
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 20,
    elevation: 5,
  },
  closeButtonText: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
  },
  fullScreenImage: {
    width: screenWidth,
    height: "90%",
    resizeMode: "contain",
    borderRadius: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  paginationButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default styles;
