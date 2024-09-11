import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

type AlertButton = {
  text: string;
  onPress: () => void;
  style?: "default" | "cancel" | "destructive";
};

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  buttons?: AlertButton[];
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  onClose,
  buttons,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text>{title}</Text>
          <Text>{message}</Text>

          {buttons &&
            buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                onPress={button.onPress}
                style={{
                  backgroundColor:
                    button.style === "destructive" ? "red" : "blue",
                  padding: 10,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "white" }}>{button.text}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
