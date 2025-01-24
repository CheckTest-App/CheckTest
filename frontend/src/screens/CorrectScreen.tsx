import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import logoBase64 from "../assets/logoBase64";
import { RootStackParamList } from "../navigation/types";
import { UserContext } from "../contexts/UserContext";
import CustomAlert from "../components/CustomAlert";
import styles from "../styles/CorrectScreen.styles";
import { corrigirProvaFetch, enviarResultadoFetch, ResultadoQuestao } from "services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "UserContext não está definido. Verifique se o UserProvider está envolvido ao redor de seu aplicativo."
    );
  }

  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
  });
  const [resultados, setResultados] = useState<object>({});
  const [responded, setResponded] = useState<boolean>(false);

  // Atualiza o email do usuário logado
  useEffect(() => {
    if (userContext.loggedInUser) {
      setLoggedInEmail(userContext.loggedInUser.email);
    } else {
      setLoggedInEmail(null); // Nenhum usuário logado
    }
  }, [userContext.loggedInUser]);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleCorrectTests = async () => {
    let data;

    try {
      const gabarito = await AsyncStorage.getItem("gabarito");
      const provasStr = await AsyncStorage.getItem("provas");
      let provas = null;
      
      if (provasStr) {
        try {
          provas = JSON.parse(provasStr);
        } catch (error) {
          console.error("Erro ao analisar JSON de 'provas':", error);
        }
      }
  
      // Crie um FormData para enviar os arquivos
      const formData = new FormData();
      formData.append('gabarito', {
        uri: gabarito,
        type: 'image/jpeg', // ajuste o tipo conforme necessário
        name: 'gabarito.jpg', // você pode ajustar o nome
      });
  
      // Adicione as provas como arquivos
      provas.forEach((prova: any, index: number) => {
        formData.append('prova', {
          uri: prova,
          type: 'image/jpeg', // ajuste o tipo conforme necessário
          name: `prova_${index}.jpg`, // nome do arquivo
        });
      });
  
      data = await corrigirProvaFetch(formData);

      setResponded(true);
      setResultados(data.resultados);
  
      await AsyncStorage.multiRemove(['gabarito', 'provas']);
  
      setAlertData({
        title: "Provas Corrigidas",
        message: `Correção concluída!`,
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    } catch (e) {
      console.log(e);
      
      setAlertData({
        title: "Erro",
        message: "Não foi possível corrigir as provas. Tente novamente.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    }
    setAlertVisible(true);
  };

  const handleSendEmail = async () => {
    if (!loggedInEmail) {
      setAlertData({
        title: "Erro",
        message: "Nenhum usuário logado para enviar email.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
      setAlertVisible(true);
      return;
    }

    if (resultados == null) {
      setAlertData({
        title: "Erro",
        message: "Nenhum resultado calculado.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
      setAlertVisible(true);
      return;
    }

    try {
      await enviarResultadoFetch(loggedInEmail, resultados);

      setAlertData({
        title: "Sucesso",
        message: `Resultados enviados para: ${loggedInEmail}`,
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    } catch {
      setAlertData({
        title: "Erro",
        message: "Falha no envio dos resultados. Tente novamente.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    }
    setAlertVisible(true);
  };

  const confirmEmailSend = () => {
    if (!loggedInEmail) {
      setAlertData({
        title: "Erro",
        message: "Nenhum email encontrado para enviar os resultados.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
      setAlertVisible(true);
      return;
    }

    setAlertData({
      title: "Confirmar Envio",
      message: `Enviar os resultados para o email: ${loggedInEmail}?`,
      buttons: [
        {
          text: "Cancelar",
          onPress: () => setAlertVisible(false),
        },
        {
          text: "Confirmar",
          onPress: async () => {
            setAlertVisible(false);
            await handleSendEmail();
          },
        },
      ],
    });
    setAlertVisible(true);
  };

  const renderResultado: ListRenderItem<ResultadoQuestao> = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text>
        Questão {item.questao}: {item.correta ? "Correta" : "Errada"}
      </Text>
      <Text>Valor: {item.valor} pontos</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
        buttons={alertData.buttons}
      />

      <Image source={{ uri: logoBase64 }} style={styles.logo} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCorrectTests}>
          <Text style={styles.buttonText}>Corrigir Provas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.emailButton]}
          onPress={confirmEmailSend}
          disabled={!responded}
        >
          <Text style={styles.buttonText}>Enviar para Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.navigate("UploadScreen")}
        >
          <Text style={styles.buttonText}>Voltar para Envio de Provas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {responded && (
        <Text style={{ fontWeight: "bold", marginTop: 20 }}>
          Prova(s) corrigida(s) - Clique no botão de Enviar para Email para receber as correções
        </Text>
      )}
    </View>
  );
};

export default HomeScreen;
