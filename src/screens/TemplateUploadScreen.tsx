import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import CustomAlert from "../screens/CustomAlert";
import styles from "../styles/TemplateUploadScreen.styles";

const ImageUploadScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: "", message: "" });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const selectImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!result.granted) {
      setAlertData({
        title: "Permissão necessária",
        message: "Permissão para acessar a galeria é necessária!",
      });
      setAlertVisible(true);
      return;
    }

    if (imageUri) {
      setAlertData({
        title: "Limite atingido",
        message: "Você só pode selecionar uma imagem.",
      });
      setAlertVisible(true);
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      setImageUri(pickerResult.assets[0].uri);
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

      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Inserir Gabarito</Text>
      </TouchableOpacity>

      {imageUri && (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.fullScreenImage} />
          )}
        </View>
      </Modal>

      <TouchableOpacity
        style={[styles.button, styles.darkBlueButton]}
        onPress={() => navigation.navigate("TestUploadScreen")}
      >
        <Text style={styles.buttonText}>Ir para inserir provas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploadScreen;
