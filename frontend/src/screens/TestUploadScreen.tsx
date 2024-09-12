import React, { useState } from "react"; // Importa React e o hook useState para gerenciamento de estado
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
} from "react-native"; // Importa componentes do React Native para construção da interface
import * as ImagePicker from "expo-image-picker"; // Importa o ImagePicker para selecionar imagens da galeria
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Importa hooks e tipos para navegação
import { RootStackParamList } from "../navigation/types"; // Tipagem de navegação para parâmetros
import CustomAlert from "../components/CustomAlert"; // Componente de alerta personalizado
import styles from "../styles/TestUploadScreen.styles"; // Importa os estilos da tela

// Obtém as dimensões da tela do dispositivo
const { width: screenWidth } = Dimensions.get("window");
// Define a quantidade de imagens por página
const IMAGES_PER_PAGE = 6;

const MultipleImageUploadScreen = () => {
  // Estados para armazenar informações sobre as imagens e a interface
  const [imageUris, setImageUris] = useState<string[]>([]); // Armazena URIs das imagens selecionadas
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0); // Índice da imagem atualmente selecionada
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Controle de visibilidade do modal
  const [currentPage, setCurrentPage] = useState<number>(0); // Controle da página atual de imagens
  const [alertVisible, setAlertVisible] = useState(false); // Controle de visibilidade do alerta
  const [alertData, setAlertData] = useState<{
    title: string;
    message: string;
    buttons?: {
      text: string;
      onPress: () => void;
      style?: "default" | "cancel" | "destructive";
    }[];
  }>({ title: "", message: "" }); // Dados do alerta

  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Hook para navegação entre telas

  // Função assíncrona para selecionar imagens
  const selectImages = async () => {
    // Solicita permissão para acessar a galeria de imagens
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!result.granted) {
      // Exibe alerta caso a permissão seja negada
      setAlertData({
        title: "Permissão necessária",
        message: "Permissão para acessar a galeria é necessária!",
      });
      setAlertVisible(true);
      return;
    }

    // Abre a galeria para seleção de imagens
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Apenas imagens
      allowsMultipleSelection: true, // Permite seleção múltipla
      quality: 1, // Qualidade da imagem
    });

    if (!pickerResult.canceled && pickerResult.assets) {
      const newUris: string[] = [];

      // Adiciona novas imagens, evitando duplicatas
      pickerResult.assets.forEach((asset) => {
        if (!imageUris.includes(asset.uri)) {
          newUris.push(asset.uri);
        }
      });

      // Exibe alerta se houver imagens duplicadas
      if (newUris.length < pickerResult.assets.length) {
        setAlertData({
          title: "Imagem duplicada",
          message:
            "Algumas imagens já foram selecionadas e não foram adicionadas novamente.",
        });
        setAlertVisible(true);
      }

      // Atualiza o estado com as novas URIs
      setImageUris([...imageUris, ...newUris]);
    }
  };

  // Função para abrir o modal de visualização da imagem
  const openImageModal = (index: number) => {
    setSelectedImageIndex(index + currentPage * IMAGES_PER_PAGE); // Define a imagem selecionada
    setModalVisible(true); // Exibe o modal
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Função para navegar para a tela de correção de provas
  const handleNavigateToCorrectScreen = () => {
    setAlertData({
      title: "Inserir Mais Provas",
      message: "Deseja inserir mais provas?",
      buttons: [
        {
          text: "Não",
          onPress: () => navigation.navigate("CorrectScreen"), // Navega para a tela de correção
          style: "destructive",
        },
        { text: "Sim", onPress: () => {}, style: "default" }, // Mantém o alerta aberto se sim
      ],
    });
    setAlertVisible(true); // Exibe o alerta
  };

  // Função para ir para a próxima página de imagens
  const handleNextPage = () => {
    if ((currentPage + 1) * IMAGES_PER_PAGE < imageUris.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Função para voltar à página anterior de imagens
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Função para controlar o scroll das imagens no modal
  const handleScroll = (event: any) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / screenWidth); // Calcula o índice da imagem com base no scroll
    setSelectedImageIndex(index);
  };

  // Renderiza os botões de paginação se houver mais de uma página de imagens
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
      {/* Alerta personalizado */}
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
        buttons={alertData.buttons}
      />

      {/* Exibe o logo */}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Botão para selecionar imagens */}
      <TouchableOpacity style={styles.button} onPress={selectImages}>
        <Text style={styles.buttonText}>Inserir Provas</Text>
      </TouchableOpacity>

      {/* Container de imagens selecionadas */}
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

      {/* Renderiza os botões de paginação se necessário */}
      {imageUris.length > 0 && renderPaginationButtons()}

      {/* Modal para visualização das imagens em tela cheia */}
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
          {/* Botão para fechar o modal */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseModal}
          >
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Botão para navegar para a tela de correção de provas */}
      <TouchableOpacity
        style={[styles.button, styles.darkBlueButton]}
        onPress={handleNavigateToCorrectScreen}
      >
        <Text style={styles.buttonText}>Ir para Corrigir Provas</Text>
      </TouchableOpacity>

      {/* Botão para voltar à tela anterior */}
      <TouchableOpacity
        style={[styles.button, styles.lightRedButton]}
        onPress={() => navigation.navigate("TemplateUploadScreen")}
      >
        <Text style={styles.buttonText}>Voltar para Gabarito</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MultipleImageUploadScreen; // Exporta o componente para ser utilizado em outras partes do aplicativo
