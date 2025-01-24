import React, { useState, useCallback } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import logoBase64 from "../assets/logoBase64";
import { RootStackParamList } from "../navigation/types";
import CustomAlert from "../components/CustomAlert";
import styles from "../styles/ImageUploadScreen.styles";

interface AlertData {
  title: string;
  message: string;
}

const ImageUploadScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<AlertData>({
    title: "",
    message: "",
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Função para selecionar uma imagem
  const selectImage = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        setAlertData({
          title: "Permissão necessária",
          message:
            "Acesso à galeria é necessário para selecionar imagens. Por favor, conceda a permissão nas configurações do dispositivo.",
        });
        setAlertVisible(true);
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets.length > 0) {
        const selectedUri = pickerResult.assets[0].uri;
        setImageUri(selectedUri);

        await AsyncStorage.setItem("gabarito", selectedUri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      setAlertData({
        title: "Erro",
        message: "Falha ao selecionar a imagem. Tente novamente.",
      });
      setAlertVisible(true);
    }
  }, []);

  // Função para visualizar a imagem em tela cheia
  const openImageModal = () => {
    if (imageUri) {
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
      />

      <Image source={{ uri: logoBase64 }} style={styles.logo} />

      <TouchableOpacity
        style={styles.button}
        onPress={selectImage}
        accessibilityLabel="Selecionar imagem do gabarito"
      >
        <Text style={styles.buttonText}>Selecionar Gabarito</Text>
      </TouchableOpacity>

      {imageUri && (
        <TouchableOpacity onPress={openImageModal}>
          <Image
            source={{ uri: imageUri }}
            style={styles.uploadedImage}
            accessible
            accessibilityLabel="Imagem selecionada"
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.darkBlueButton]}
        onPress={() => navigation.navigate("Upload")}
        accessibilityLabel="Ir para tela de envio da prova"
      >
        <Text style={styles.buttonText}>Ir para enviar prova</Text>
      </TouchableOpacity>

      {/* Modal para exibir a imagem em tela cheia */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Image
            source={{ uri: imageUri ?? "" }}
            style={styles.fullScreenImage}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default ImageUploadScreen;