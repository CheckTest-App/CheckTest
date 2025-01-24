import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import logoBase64 from "../assets/logoBase64";
import { RootStackParamList } from "../navigation/types";
import CustomAlert from "../components/CustomAlert";
import styles from "../styles/ImageUploadScreen.styles";

// Interface para tipagem do alerta
interface AlertData {
  title: string;
  message: string;
}

const ImageUploadScreen = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<AlertData>({ title: "", message: "" });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Função para selecionar uma imagem
  const selectImage = async (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        setAlertData({
          title: "Permissão necessária",
          message: "Permissão para acessar a galeria é necessária!",
        });
        setAlertVisible(true);
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],  // Usando o novo formato recomendado
        allowsEditing: false,
        quality: 1,
      });

      if (!pickerResult.canceled && pickerResult.assets.length > 0) {
        const uri = pickerResult.assets[0].uri;
        setImage(uri);
        console.log("Imagem selecionada:", uri);
        await AsyncStorage.setItem("gabarito", uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
      setAlertData({
        title: "Erro",
        message: "Falha ao selecionar a imagem. Tente novamente.",
      });
      setAlertVisible(true);
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

      {imageUri && <Image source={{ uri: imageUri }} style={styles.uploadedImage} />}

      <TouchableOpacity
        style={[styles.button, styles.darkBlueButton]}
        onPress={() => navigation.navigate("UploadScreen")}
      >
        <Text style={styles.buttonText}>Ir para enviar prova</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploadScreen;