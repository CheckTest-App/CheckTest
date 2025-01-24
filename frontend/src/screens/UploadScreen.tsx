import React, { useState, useCallback, useEffect } from "react";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoBase64 from "../assets/logoBase64";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import CustomAlert from "../components/CustomAlert";
import styles from "../styles/UploadScreen.styles";

const MAX_IMAGES = 9;

const UploadScreen = () => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
  });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadStoredImages = async () => {
      try {
        const storedProvas = await AsyncStorage.getItem("provas");
        if (storedProvas) {
          setImageUris(JSON.parse(storedProvas));
        }
      } catch (error) {
        console.error("Erro ao carregar provas:", error);
      }
    };
    loadStoredImages();
  }, []);

  const saveProvas = async (provasUris: string[]) => {
    await AsyncStorage.setItem("provas", JSON.stringify(provasUris));
  };

  const selectImages = useCallback(async () => {
    if (imageUris.length >= MAX_IMAGES) {
      setAlertData({
        title: "Limite atingido",
        message: `Você pode adicionar no máximo ${MAX_IMAGES} imagens.`,
      });
      setAlertVisible(true);
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      setAlertData({
        title: "Permissão necessária",
        message: "Você precisa conceder acesso à galeria para adicionar imagens.",
      });
      setAlertVisible(true);
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets) {
      setImageUris((prevUris) => {
        const newUris = pickerResult.assets.map((asset) => asset.uri);
        const updatedUris = [...prevUris, ...newUris].slice(0, MAX_IMAGES);
        saveProvas(updatedUris);
        return updatedUris;
      });
    }
  }, [imageUris]);

  const openImageModal = useCallback((uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  }, []);

  const handleCloseModal = () => setModalVisible(false);

  const deleteImage = async (index: number) => {
    Alert.alert("Excluir imagem", "Deseja realmente excluir esta imagem?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        onPress: async () => {
          setImageUris((prevUris) => {
            const updatedUris = prevUris.filter((_, i) => i !== index);
            saveProvas(updatedUris);
            return updatedUris;
          });
        },
      },
    ]);
  };

  const confirmNavigation = async (
    screen: keyof RootStackParamList,
    params?: RootStackParamList[keyof RootStackParamList]
  ) => {
    if (screen === "ImageUpload") {
      Alert.alert("Atenção", "Você perderá as imagens adicionadas. Deseja continuar?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            await AsyncStorage.removeItem("provas");
            navigation.navigate(screen, params as any);
          },
        },
      ]);
    } else {
      navigation.navigate(screen, params as any);
    }
  };  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
      />

      <Image source={{ uri: logoBase64 }} style={styles.logo} />

      <TouchableOpacity style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={selectImages}>
          <Text style={styles.buttonText}>Inserir Provas</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {imageUris.map((uri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openImageModal(uri)}
            onLongPress={() => deleteImage(index)}
          >
            <Image source={{ uri: uri }} style={styles.uploadedImage} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={() => confirmNavigation("Correct")}
        >
          <Text style={styles.buttonText}>Ir para Correção</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.redButton]}
          onPress={() => confirmNavigation("ImageUpload")}
        >
          <Text style={styles.buttonText}>Voltar para Gabarito</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />}
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default UploadScreen;
