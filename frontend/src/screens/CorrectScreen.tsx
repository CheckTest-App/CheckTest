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

type ResultadoQuestao = {
  questao: number;
  correta: boolean;
  valor: number;
};

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
  const [resultado, setResultado] = useState<ResultadoQuestao[] | null>(null);
  const [pontuacaoTotal, setPontuacaoTotal] = useState(0);

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
    try {
      const response = await fetch(
        "http://192.168.1.180:3000/api/corrigir-prova",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );

      const data = await response.json();
      setResultado(data.resultado.resultado);
      setPontuacaoTotal(data.resultado.pontuacaoTotal);

      setAlertData({
        title: "Provas Corrigidas",
        message: `Correção concluída! Pontuação total: ${data.resultado.pontuacaoTotal}`,
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    } catch {
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

    try {
      await fetch("http://192.168.1.180:3000/api/enviar-resultado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loggedInEmail,
          resultado: { resultado, pontuacaoTotal },
        }),
      });

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
        >
          <Text style={styles.buttonText}>Enviar para Email</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.navigate("TestUploadScreen")}
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

      {resultado && (
        <>
          <FlatList
            data={resultado}
            keyExtractor={(item) => item.questao.toString()}
            renderItem={renderResultado}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
            Pontuação Total: {pontuacaoTotal} pontos
          </Text>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
