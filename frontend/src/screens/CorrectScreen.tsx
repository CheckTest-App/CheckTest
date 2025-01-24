import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ListRenderItem,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import logoBase64 from "../assets/logoBase64";
import { RootStackParamList } from "../navigation/types";
import { UserContext } from "../contexts/UserContext";
import CustomAlert from "../components/CustomAlert";
import styles from "../styles/CorrectScreen.styles";
import { corrigirProvaFetch, enviarResultadoFetch, ResultadoQuestao } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CorrectScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext não encontrado. Certifique-se de envolver o aplicativo com UserProvider.");
  }

  const [loggedInEmail, setLoggedInEmail] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [resultados, setResultados] = useState<ResultadoQuestao[]>([]);
  const [responded, setResponded] = useState<boolean>(false);

  const [alertData, setAlertData] = useState({
    title: "",
    message: "",
    buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
  });

  useEffect(() => {
    setLoggedInEmail(userContext.loggedInUser?.email ?? null);
  }, [userContext.loggedInUser]);

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove(["gabarito", "provas"]);
  
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Erro ao excluir imagens:", error);
      setAlertData({
        title: "Erro",
        message: "Não foi possível limpar os dados.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
      setAlertVisible(true);
    }
  }, [navigation]);  

  const handleCorrectTests = useCallback(async () => {
    try {
      const [gabarito, provasStr] = await Promise.all([
        AsyncStorage.getItem("gabarito"),
        AsyncStorage.getItem("provas"),
      ]);

      if (!gabarito || !provasStr) {
        throw new Error("Dados insuficientes para a correção.");
      }

      let provas;
      try {
        provas = JSON.parse(provasStr);
        if (!Array.isArray(provas) || provas.length === 0) {
          throw new Error("Nenhuma prova válida encontrada.");
        }
      } catch (error) {
        console.error("Erro ao analisar JSON de 'provas':", error);
        setAlertData({
          title: "Erro",
          message: "Formato de dados inválido para provas.",
          buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
        });
        setAlertVisible(true);
        return;
      }

      const formData = new FormData();
      formData.append("gabarito", {
        uri: gabarito,
        type: "image/jpeg",
        name: "gabarito.jpg",
      });

      provas.forEach((prova: string, index: number) => {
        formData.append("provas", {
          uri: prova,
          type: "image/jpeg",
          name: `prova_${index}.jpg`,
        });
      });

      // Envio de dados para a API
      const data = await corrigirProvaFetch(formData);

      if (!data || !data.resultados) {
        throw new Error("Resposta inválida do servidor.");
      }

      setResultados(data.resultados);
      setResponded(true);

      await AsyncStorage.multiRemove(["gabarito", "provas"]);

      setAlertData({
        title: "Provas Corrigidas",
        message: "Correção concluída com sucesso!",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    } catch (error) {
      console.error("Erro ao corrigir provas:", error);
      setAlertData({
        title: "Erro",
        message: "Não foi possível corrigir as provas. Tente novamente.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    }
    setAlertVisible(true);
  }, []);

  const handleSendEmail = useCallback(async () => {
    if (!loggedInEmail) {
      setAlertData({
        title: "Erro",
        message: "Nenhum usuário logado para envio de email.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
      setAlertVisible(true);
      return;
    }

    if (!resultados || resultados.length === 0) {
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
  }, [loggedInEmail, resultados]);

  const confirmEmailSend = () => {
    if (!loggedInEmail) {
      setAlertData({
        title: "Erro",
        message: "Nenhum email encontrado para envio.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
      setAlertVisible(true);
      return;
    }

    setAlertData({
      title: "Confirmar Envio",
      message: `Deseja enviar os resultados para ${loggedInEmail}?`,
      buttons: [
        { text: "Cancelar", onPress: () => setAlertVisible(false) },
        { text: "Confirmar", onPress: handleSendEmail },
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

      <TouchableOpacity style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={handleCorrectTests}>
          <Text style={styles.buttonText}>Corrigir Provas</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={confirmEmailSend} disabled={!responded}>
          <Text style={styles.buttonText}>Enviar para Email</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.lightRedButton]} onPress={() => navigation.navigate("Upload")}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.darkRedButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {responded && (
        <Text style={styles.infoText}>Correção concluída. Envie os resultados para seu email.</Text>
      )}
    </View>
  );
};

export default CorrectScreen;