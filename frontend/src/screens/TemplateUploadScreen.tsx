import React, { useState } from "react"; // Importa React e o hook useState para gerenciar estados
import { View, Image, TouchableOpacity, Text, Modal } from "react-native"; // Importa componentes básicos do React Native para interface
import logoBase64 from "../assets/logoBase64"; // Importe a string Base64
import * as ImagePicker from "expo-image-picker"; // Importa a biblioteca ImagePicker para seleção de imagens
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Importa hooks e tipos para navegação
import { RootStackParamList } from "../navigation/types"; // Tipagem de navegação para os parâmetros da pilha de navegação
import CustomAlert from "../components/CustomAlert"; // Componente personalizado para exibição de alertas
import styles from "../styles/TemplateUploadScreen.styles"; // Importa os estilos para a tela de upload de imagem

// Componente funcional para a tela de upload de imagem
const ImageUploadScreen = () => {
  // Estado para armazenar a URI da imagem selecionada
  const [imageUri, setImageUri] = useState<string | null>(null);
  // Estado para controlar a visibilidade do modal de visualização da imagem
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  // Estado para controlar a visibilidade do alerta personalizado
  const [alertVisible, setAlertVisible] = useState(false);
  // Estado para armazenar os dados (título e mensagem) do alerta
  const [alertData, setAlertData] = useState({ title: "", message: "" });

  // Hook para navegação entre telas
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Função assíncrona para selecionar uma imagem da galeria
  const selectImage = async () => {
    // Solicita permissão para acessar a galeria de imagens do dispositivo
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();

    // Verifica se a permissão foi negada e exibe um alerta se necessário
    if (!result.granted) {
      setAlertData({
        title: "Permissão necessária", // Título do alerta
        message: "Permissão para acessar a galeria é necessária!", // Mensagem do alerta
      });
      setAlertVisible(true); // Exibe o alerta
      return; // Interrompe a execução da função
    }

    // Verifica se já existe uma imagem selecionada e exibe um alerta se necessário
    if (imageUri) {
      setAlertData({
        title: "Limite atingido", // Título do alerta
        message: "Você só pode selecionar uma imagem.", // Mensagem do alerta
      });
      setAlertVisible(true); // Exibe o alerta
      return; // Interrompe a execução da função
    }

    // Abre a galeria para o usuário selecionar uma imagem
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Limita a seleção a imagens
      allowsEditing: false, // Não permite edição da imagem
      quality: 1, // Define a qualidade da imagem selecionada
    });

    // Verifica se o usuário cancelou a seleção e se há uma imagem válida
    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      // Atualiza o estado com a URI da imagem selecionada
      setImageUri(pickerResult.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Componente de alerta personalizado */}
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
      />

      {/* Exibe o logo da aplicação */}
      <Image
        source={{ uri: logoBase64 }}
        style={styles.logo}
      />

      {/* Botão para selecionar uma imagem */}
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Inserir Gabarito</Text>
      </TouchableOpacity>

      {/* Verifica se uma imagem foi selecionada e exibe um preview da imagem */}
      {imageUri && (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
        </TouchableOpacity>
      )}

      {/* Modal para exibir a imagem em tela cheia */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Botão para fechar o modal */}
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

      {/* Botão para navegar para a tela de inserção de provas */}
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
