import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

// Define as propriedades esperadas para o componente CustomAlert
type CustomAlertProps = {
  visible: boolean; // Controla a visibilidade do alerta
  title: string; // Título do alerta
  message: string; // Mensagem a ser exibida no alerta
  onClose: () => void; // Função chamada quando o alerta é fechado
  buttons?: {
    // Array de botões customizados (opcional)
    text: string; // Texto do botão
    onPress: () => void; // Função executada ao clicar no botão
    style?: "default" | "cancel" | "destructive"; // Estilo opcional do botão
  }[];
};

// Componente funcional CustomAlert
const CustomAlert: React.FC<CustomAlertProps> = ({
  visible, // Define se o modal será exibido ou não
  title, // O título do alerta
  message, // A mensagem do alerta
  onClose, // Função de fechamento do alerta
  buttons = [{ text: "OK", onPress: onClose }], // Define um botão padrão caso nenhum seja passado
}) => {
  return (
    // Modal que exibe o alerta, visível de acordo com a prop `visible`
    <Modal visible={visible} transparent={true} animationType="fade">
      {/* Tela escurecida como fundo do modal */}
      <View style={styles.overlay}>
        {/* Contêiner do alerta */}
        <View style={styles.alertContainer}>
          {/* Título do alerta */}
          <Text style={styles.alertTitle}>{title}</Text>
          {/* Mensagem do alerta */}
          <Text style={styles.alertMessage}>{message}</Text>
          {/* Contêiner dos botões */}
          <View style={styles.buttonsContainer}>
            {/* Mapeia os botões passados como props e renderiza */}
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === "destructive" && styles.destructiveButton,
                  button.style === "cancel" && styles.cancelButton,
                ]}
                onPress={button.onPress}
              >
                <Text style={styles.buttonText}>{button.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Estilos do componente
const styles = StyleSheet.create({
  overlay: {
    flex: 1, // Ocupa toda a tela
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escurecido para o modal
  },
  alertContainer: {
    width: 300, // Largura do contêiner do alerta
    padding: 20, // Espaçamento interno
    backgroundColor: "#fff", // Fundo branco para o alerta
    borderRadius: 10, // Bordas arredondadas
    alignItems: "center", // Centraliza o conteúdo
    elevation: 5, // Sombra para dar profundidade
  },
  alertTitle: {
    fontSize: 18, // Tamanho da fonte do título
    fontWeight: "bold", // Negrito para o título
    marginBottom: 10, // Espaçamento abaixo do título
  },
  alertMessage: {
    fontSize: 16, // Tamanho da fonte da mensagem
    color: "#495057", // Cor do texto da mensagem
    marginBottom: 20, // Espaçamento abaixo da mensagem
    textAlign: "center", // Centraliza o texto da mensagem
  },
  buttonsContainer: {
    flexDirection: "row", // Organiza os botões em linha
    justifyContent: "space-between", // Espaça os botões
  },
  button: {
    flex: 1, // Botão ocupa o espaço disponível
    paddingVertical: 10, // Espaçamento vertical interno
    paddingHorizontal: 15, // Espaçamento horizontal interno
    marginHorizontal: 5, // Espaçamento entre os botões
    borderRadius: 5, // Bordas arredondadas
    backgroundColor: "#007bff", // Cor de fundo azul para o botão
    alignItems: "center", // Centraliza o texto horizontalmente
  },
  buttonText: {
    color: "#fff", // Texto branco no botão
    fontSize: 16, // Tamanho da fonte do texto do botão
  },
  destructiveButton: {
    backgroundColor: "#dc3545", // Cor de fundo vermelha para botões destrutivos
  },
  cancelButton: {
    backgroundColor: "#6c757d", // Cor de fundo cinza para botões de cancelamento
  },
});

export default CustomAlert; // Exporta o componente
