import React, { useState } from "react";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import CustomAlert from "../screens/CustomAlert";
import styles from "../styles/TestUploadScreen.styles";

const { width: screenWidth } = Dimensions.get("window");
const IMAGES_PER_PAGE = 6;

const MultipleImageUploadScreen = () => {
  const [imageUris, setImageUris] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState<{
    title: string;
    message: string;
    buttons?: {
      text: string;
      onPress: () => void;
      style?: "default" | "cancel" | "destructive";
    }[];
  }>({ title: "", message: "" });

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const selectImages = async () => {
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
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets) {
      const newUris: string[] = [];

      pickerResult.assets.forEach((asset) => {
        if (!imageUris.includes(asset.uri)) {
          newUris.push(asset.uri);
        }
      });

      if (newUris.length < pickerResult.assets.length) {
        setAlertData({
          title: "Imagem duplicada",
          message:
            "Algumas imagens já foram selecionadas e não foram adicionadas novamente.",
        });
        setAlertVisible(true);
      }

      setImageUris([...imageUris, ...newUris]);
    }
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index + currentPage * IMAGES_PER_PAGE);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleNavigateToCorrectScreen = () => {
    setAlertData({
      title: "Inserir Mais Provas",
      message: "Deseja inserir mais provas?",
      buttons: [
        {
          text: "Não",
          onPress: () => navigation.navigate("CorrectScreen"),
          style: "destructive",
        },
        { text: "Sim", onPress: () => {}, style: "default" },
      ],
    });
    setAlertVisible(true);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * IMAGES_PER_PAGE < imageUris.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleScroll = (event: any) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
    setSelectedImageIndex(index);
  };

  const renderPaginationButtons = () => {
    if (imageUris.length > IMAGES_PER_PAGE) {
      return (
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={[styles.button, styles.paginationButton]}
            onPress={handlePreviousPage}
            disabled={currentPage === 0}
          >
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.paginationButton]}
            onPress={handleNextPage}
            disabled={(currentPage + 1) * IMAGES_PER_PAGE >= imageUris.length}
          >
            <Text style={styles.buttonText}>Próxima</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
        buttons={alertData.buttons}
      />

      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <TouchableOpacity style={styles.button} onPress={selectImages}>
        <Text style={styles.buttonText}>Inserir Provas</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {imageUris
          .slice(
            currentPage * IMAGES_PER_PAGE,
            (currentPage + 1) * IMAGES_PER_PAGE
          )
          .map((uri, index) => (
            <TouchableOpacity key={index} onPress={() => openImageModal(index)}>
              <Image source={{ uri: uri }} style={styles.uploadedImage} />
            </TouchableOpacity>
          ))}
      </View>

      {imageUris.length > 0 && renderPaginationButtons()}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            contentOffset={{ x: selectedImageIndex * screenWidth, y: 0 }}
          >
            {imageUris.map((uri, index) => (
              <Image
                key={index}
                source={{ uri: uri }}
                style={styles.fullScreenImage}
              />
            ))}
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity
        style={[styles.button, styles.darkBlueButton]}
        onPress={handleNavigateToCorrectScreen}
      >
        <Text style={styles.buttonText}>Ir para Corrigir Provas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.lightRedButton]}
        onPress={() => navigation.navigate("TemplateUploadScreen")}
      >
        <Text style={styles.buttonText}>Voltar para Gabarito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MultipleImageUploadScreen;
