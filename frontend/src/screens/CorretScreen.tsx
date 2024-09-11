import React, { useContext, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ListRenderItem,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { UserContext } from "../contexts/UserContext";
import CustomAlert from "./CustomAlert";
import styles from "../styles/CorretScreen.style";

// Definindo o tipo para o resultado de uma questão
type ResultadoQuestao = {
  questao: number;
  correta: boolean;
  valor: number;
};

type AlertButton = {
  text: string;
  onPress: () => void;
  style?: "default" | "cancel" | "destructive";
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "UserContext não está definido. Verifique se o UserProvider está envolvido ao redor de seu aplicativo."
    );
  }

  const email = userContext.users.length
    ? userContext.users[0].email
    : "aluiza.araujot@gmail.com";

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState<{
    title: string;
    message: string;
    buttons: AlertButton[];
  }>({
    title: "",
    message: "",
    buttons: [],
  });

  const [resultado, setResultado] = useState<ResultadoQuestao[] | null>(null);
  const [pontuacaoTotal, setPontuacaoTotal] = useState(0);

  // Função para corrigir as provas e exibir os resultados
  const handleCorrectTests = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/corrigir-prova", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          /* Dados da prova */
        }),
      });

      const data = await response.json();

      // Define o resultado e pontuação
      setResultado(data.resultado.resultado);
      setPontuacaoTotal(data.resultado.pontuacaoTotal);

      setAlertData({
        title: "Provas Corrigidas",
        message: "As provas foram corrigidas com sucesso!",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    } catch (error) {
      console.error(error);
      setAlertData({
        title: "Erro",
        message: "Erro ao corrigir as provas. Tente novamente.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    }

    setAlertVisible(true);
  };

  // Função para enviar o resultado por e-mail
  const handleSendEmail = async () => {
    try {
      await fetch("http://localhost:3000/api/enviar-resultado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          resultado: { resultado, pontuacaoTotal },
        }),
      });

      setAlertData({
        title: "Envio de Provas",
        message: `Resultados enviados para o e-mail: ${email}`,
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    } catch (error) {
      console.error(error);
      setAlertData({
        title: "Erro",
        message: "Erro ao enviar o e-mail. Tente novamente.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    }

    setAlertVisible(true);
  };

  // Função para o logout
  const handleLogout = () => {
    setAlertData({
      title: "Logout",
      message: "Você tem certeza que deseja sair?",
      buttons: [
        {
          text: "Cancelar",
          onPress: () => setAlertVisible(false),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          },
          style: "destructive",
        },
      ],
    });
    setAlertVisible(true);
  };

  // Renderiza os resultados na tela com tipo específico
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

      <Image
        source={require("frontend\src\assets\images\logo.png")}
        style={styles.logo}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCorrectTests}>
          <Text style={styles.buttonText}>Corrigir Provas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.emailButton]}
          onPress={handleSendEmail}
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
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Exibe os resultados das provas corrigidas */}
      {resultado && (
        <FlatList
          data={resultado}
          keyExtractor={(item) => item.questao.toString()}
          renderItem={renderResultado}
        />
      )}

      {/* Exibe a pontuação total */}
      {resultado && (
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          Pontuação Total: {pontuacaoTotal} pontos
        </Text>
      )}
    </View>
  );
};

export default HomeScreen;