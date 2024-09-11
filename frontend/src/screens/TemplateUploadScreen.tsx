import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import CustomAlert from "./CustomAlert";
import styles from "../styles/TemplateUploadScreen.styles";

const ImageUploadScreen = () => {
  const [gabaritoUri, setGabaritoUri] = useState<string | null>(null);
  const [provaUri, setProvaUri] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({ title: "", message: "" });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Função para selecionar imagem do gabarito
  const selectGabarito = async () => {
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
    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setGabaritoUri(pickerResult.assets[0].uri);
    }
  };

  // Função para selecionar imagem da prova
  const selectProva = async () => {
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
    if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
      setProvaUri(pickerResult.assets[0].uri);
    }
  };

  // Função para enviar o gabarito e prova para o backend
  const submitImages = async () => {
    if (!gabaritoUri || !provaUri) {
      setAlertData({
        title: "Imagens Faltando",
        message: "Por favor, selecione o gabarito e a prova.",
      });
      setAlertVisible(true);
      return;
    }

    const formData = new FormData();
    formData.append("gabarito", {
      uri: gabaritoUri,
      type: "image/jpeg",
      name: "gabarito.jpg",
    });
    formData.append("prova", {
      uri: provaUri,
      type: "image/jpeg",
      name: "prova.jpg",
    });

    try {
      const response = await fetch('http://localhost:3000/api/corrigir-prova', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const result = await response.json();
      setAlertData({
        title: "Resultado",
        message: result.resultado,
      });
      setAlertVisible(true);
    } catch (error) {
      setAlertData({
        title: "Erro",
        message: "Erro ao enviar as imagens. Tente novamente.",
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

      {/* Botão para selecionar o gabarito */}
      <TouchableOpacity style={styles.button} onPress={selectGabarito}>
        <Text style={styles.buttonText}>Selecionar Gabarito</Text>
      </TouchableOpacity>

      {/* Botão para selecionar a prova */}
      <TouchableOpacity style={styles.button} onPress={selectProva}>
        <Text style={styles.buttonText}>Selecionar Prova</Text>
      </TouchableOpacity>

      {/* Botão para enviar as imagens */}
      <TouchableOpacity style={styles.button} onPress={submitImages}>
        <Text style={styles.buttonText}>Corrigir Prova</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploadScreen;