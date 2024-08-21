import React, { useState } from "react";
import {
  Image,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import styles from "../styles/TestUploadScreen.styles";

const MultipleImageUploadScreen = () => {
  // Estado para armazenar os URIs das imagens selecionadas
  const [imageUris, setImageUris] = useState<string[]>([]);

  // Hook de navegação, tipado corretamente com RootStackParamList
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Função para selecionar múltiplas imagens da galeria
  const selectImages = async () => {
    // Solicita permissão para acessar a galeria de imagens
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!result.granted) {
      Alert.alert(
        "Permissão necessária",
        "Permissão para acessar a galeria é necessária!"
      );
      return;
    }

    // Abre a galeria de imagens para seleção de múltiplas imagens
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Permite a seleção de múltiplas imagens
      quality: 1, // Define a qualidade das imagens
    });

    // Verifica se imagens foram selecionadas e armazena seus URIs
    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      const newUris = pickerResult.assets.map((asset) => asset.uri);
      setImageUris([...imageUris, ...newUris]); // Adiciona as novas imagens ao estado
    }
  };

  // Função para navegar para a tela de correção de provas
  const handleNavigateToCorrectScreen = () => {
    Alert.alert(
      "Inserir Mais Provas",
      "Deseja inserir mais provas?",
      [
        {
          text: "Não",
          onPress: () => navigation.navigate("CorrectScreen"),
          style: "destructive",
        },
        {
          text: "Sim",
          onPress: () => {},
          style: "default",
        },
      ],
      { cancelable: true } // Permite cancelar o alerta tocando fora dele
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Exibe o logo da aplicação */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Botão para selecionar múltiplas imagens */}
      <TouchableOpacity style={styles.button} onPress={selectImages}>
        <Text style={styles.buttonText}>Inserir Provas</Text>
      </TouchableOpacity>

      {/* Contêiner para exibir as imagens selecionadas */}
      <View style={styles.imageContainer}>
        {imageUris.map((uri, index) => (
          <Image
            key={index}
            source={{ uri: uri }}
            style={styles.uploadedImage}
          />
        ))}
      </View>

      {/* Botão para navegar para a tela de correção de provas com cor azul escuro */}
      <TouchableOpacity
        style={[styles.button, styles.darkBlueButton]} // Aplica o estilo azul escuro adicionalmente
        onPress={handleNavigateToCorrectScreen}
      >
        <Text style={styles.buttonText}>Ir para Corrigir Provas</Text>
      </TouchableOpacity>

      {/* Botão para voltar para a tela de gabarito com um tom de vermelho claro */}
      <TouchableOpacity
        style={[styles.button, styles.lightRedButton]} // Aplica o estilo vermelho claro adicionalmente
        onPress={() => navigation.navigate("TemplateUploadScreen")}
      >
        <Text style={styles.buttonText}>Voltar para Gabarito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MultipleImageUploadScreen;
