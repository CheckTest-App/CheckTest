import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import styles from "../styles/TemplateUploadScreen.styles";

const ImageUploadScreen = () => {
  // Estado para armazenar o URI da imagem selecionada
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Hook de navegação, tipado corretamente com RootStackParamList
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Função para selecionar a imagem da galeria
  const selectImage = async () => {
    // Solicita permissão para acessar a galeria de imagens
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!result.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permissão para acessar a galeria é necessária!"
      );
      return;
    }

    // Verifica se uma imagem já foi selecionada
    if (imageUri) {
      Alert.alert("Limite atingido", "Você só pode selecionar uma imagem.");
      return;
    }

    // Abre a galeria de imagens para seleção
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3], // Define a proporção da imagem
      quality: 1, // Define a qualidade da imagem
    });

    // Verifica se uma imagem foi selecionada e armazena seu URI
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
      {/* Exibe o logo da aplicação */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Botão para selecionar a imagem do gabarito */}
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Inserir Gabarito</Text>
      </TouchableOpacity>

      {/* Exibe a imagem selecionada, se houver */}
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
      )}

      {/* Botão para navegar para a tela de inserção de provas com cor azul escuro */}
      <TouchableOpacity
        style={[styles.button, styles.darkBlueButton]} // Aplica o estilo azul escuro adicionalmente
        onPress={() => navigation.navigate("TestUploadScreen")}
      >
        <Text style={styles.buttonText}>Ir para inserir provas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploadScreen;
