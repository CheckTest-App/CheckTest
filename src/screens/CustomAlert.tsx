import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

type CustomAlertProps = {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttons?: {
    text: string;
    onPress: () => void;
    style?: "default" | "cancel" | "destructive";
  }[];
};

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  onClose,
  buttons = [{ text: "OK", onPress: onClose }],
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{message}</Text>
          <View style={styles.buttonsContainer}>
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    color: "#495057",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#007bff",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  destructiveButton: {
    backgroundColor: "#dc3545",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
});

export default CustomAlert;
