import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, Modal } from "react-native";
import logoBase64 from "../assets/logoBase64";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import CustomAlert from "../components/CustomAlert";
import styles from "../styles/TemplateUploadScreen.styles";

const TemplateUploadScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [secondImageUri, setSecondImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: "", message: "" });
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const selectImage = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      setAlertData({
        title: "Permissão necessária",
        message: "Permissão para acessar a galeria é necessária!",
      });
      setAlertVisible(true);
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      setImage(pickerResult.assets[0].uri);
    }
  };

  const handleGabaritoUpload = async () => {
    if (!imageUri || !secondImageUri) {
      console.error(
        "Ambas as imagens (gabarito e prova) devem ser selecionadas"
      );
      return;
    }

    const formData = new FormData();
    formData.append("gabarito", {
      uri: imageUri,
      type: "image/jpeg",
      name: "gabarito.jpg",
    });

    formData.append("prova", {
      uri: secondImageUri,
      type: "image/jpeg",
      name: "prova.jpg",
    });

    try {
      const response = await fetch(
        "http://192.168.1.180:3000/api/corrigir-prova",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Erro ao enviar gabarito:", error);
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
        onPress={() => selectImage(setImageUri)}
      >
        <Text style={styles.buttonText}>Selecionar Gabarito</Text>
      </TouchableOpacity>
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => selectImage(setSecondImageUri)}
      >
        <Text style={styles.buttonText}>Selecionar Prova</Text>
      </TouchableOpacity>
      {secondImageUri && (
        <>
          <Image
            source={{ uri: secondImageUri }}
            style={styles.uploadedImage}
          />
        </>
      )}

      {imageUri && secondImageUri && (
        <TouchableOpacity style={styles.button} onPress={handleGabaritoUpload}>
          <Text style={styles.buttonText}>Enviar Gabarito e Prova</Text>
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

export default TemplateUploadScreen;