import React, { useContext, useState } from "react"; // Importa React, useContext para acessar o contexto e useState para gerenciar estado
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ListRenderItem,
} from "react-native"; // Importa componentes do React Native para criar a interface do usuário
import logoBase64 from "../assets/logoBase64";
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Importa useNavigation para navegação e NavigationProp para tipagem das rotas
import { RootStackParamList } from "../navigation/types"; // Importa tipagem das rotas
import { UserContext } from "../contexts/UserContext"; // Importa o contexto de usuário para acessar informações globais
import CustomAlert from "../components/CustomAlert"; // Importa um componente customizado de alerta
import styles from "../styles/CorretScreen.style"; // Importa estilos específicos da tela

// Define o tipo de dados para o resultado de uma questão
type ResultadoQuestao = {
  questao: number; // Número da questão
  correta: boolean; // Indica se a resposta foi correta ou não
  valor: number; // Valor da questão em pontos
};

// Define o tipo para os botões de alerta
type AlertButton = {
  text: string; // Texto do botão
  onPress: () => void; // Função executada ao pressionar o botão
  style?: "default" | "cancel" | "destructive"; // Estilo opcional do botão
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Hook para navegar entre as telas
  const userContext = useContext(UserContext); // Usa o contexto para acessar dados do usuário

  // Verifica se o contexto de usuário está definido corretamente
  if (!userContext) {
    throw new Error(
      "UserContext não está definido. Verifique se o UserProvider está envolvido ao redor de seu aplicativo."
    );
  }

  // Define o e-mail do usuário a partir do contexto ou um padrão se não houver
  const email = userContext.users.length
    ? userContext.users[0].email
    : "aluiza.araujot@gmail.com";

  // Estado para controlar a visibilidade do alerta
  const [alertVisible, setAlertVisible] = useState(false);
  // Estado para armazenar o conteúdo do alerta (título, mensagem e botões)
  const [alertData, setAlertData] = useState<{
    title: string;
    message: string;
    buttons: AlertButton[];
  }>({
    title: "",
    message: "",
    buttons: [],
  });

  // Estado para armazenar o resultado da correção das questões
  const [resultado, setResultado] = useState<ResultadoQuestao[] | null>(null);
  // Estado para armazenar a pontuação total obtida
  const [pontuacaoTotal, setPontuacaoTotal] = useState(0);

  // Função para corrigir provas e mostrar os resultados
  const handleCorrectTests = async () => {
    try {
      const response = await fetch("http://192.168.1.180:3000/api/corrigir-prova", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: JSON.stringify({
          /* Dados da prova */
        }),
      });

      const data = await response.json();

      // Atualiza o resultado e pontuação total
      setResultado(data.resultado.resultado);
      setPontuacaoTotal(data.resultado.pontuacaoTotal);

      // Configura o alerta para mostrar sucesso na correção
      setAlertData({
        title: "Provas Corrigidas",
        message: "As provas foram corrigidas com sucesso!",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    } catch (error) {
      console.error(error);
      // Configura o alerta para erro na correção
      setAlertData({
        title: "Erro",
        message: "Erro ao corrigir as provas. Tente novamente.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    }

    setAlertVisible(true); // Exibe o alerta
  };

  // Função para enviar o resultado por e-mail
  const handleSendEmail = async () => {
    try {
      await fetch("http://192.168.1.180:3000/api/enviar-resultado", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // E-mail do destinatário
          resultado: { resultado, pontuacaoTotal }, // Dados do resultado
        }),
      });

      // Alerta de sucesso ao enviar por e-mail
      setAlertData({
        title: "Envio de Provas",
        message: `Resultados enviados para o e-mail: ${email}`,
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    } catch (error) {
      console.error(error);
      // Alerta de erro no envio do e-mail
      setAlertData({
        title: "Erro",
        message: "Erro ao enviar o e-mail. Tente novamente.",
        buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
      });
    }

    setAlertVisible(true); // Exibe o alerta
  };

  // Função para realizar logout
  const handleLogout = () => {
    // Configura o alerta de confirmação de logout
    setAlertData({
      title: "Logout",
      message: "Você tem certeza que deseja sair?",
      buttons: [
        {
          text: "Cancelar", // Botão de cancelar
          onPress: () => setAlertVisible(false),
          style: "cancel",
        },
        {
          text: "Logout", // Botão de confirmar logout
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
    setAlertVisible(true); // Exibe o alerta
  };

  // Função para renderizar o resultado de cada questão corrigida
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
      {/* Componente CustomAlert para exibir mensagens de alerta */}
      <CustomAlert
        visible={alertVisible}
        title={alertData.title}
        message={alertData.message}
        onClose={() => setAlertVisible(false)}
        buttons={alertData.buttons}
      />

      {/* Exibe o logo da aplicação */}
      <Image
        source={{ uri: logoBase64 }}
        style={styles.logo}
      />

      {/* Botão para corrigir provas */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCorrectTests}>
          <Text style={styles.buttonText}>Corrigir Provas</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para enviar resultado por e-mail */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.emailButton]}
          onPress={handleSendEmail}
        >
          <Text style={styles.buttonText}>Enviar para Email</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para voltar à tela de envio de provas */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.navigate("TestUploadScreen")}
        >
          <Text style={styles.buttonText}>Voltar para Envio de Provas</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de logout */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Exibe os resultados das questões corrigidas, se houver */}
      {resultado && (
        <FlatList
          data={resultado} // Dados das questões corrigidas
          keyExtractor={(item) => item.questao.toString()} // Define a chave de cada item
          renderItem={renderResultado} // Função que renderiza cada item
        />
      )}

      {/* Exibe a pontuação total, se houver resultados */}
      {resultado && (
        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
          Pontuação Total: {pontuacaoTotal} pontos
        </Text>
      )}
    </View>
  );
};

export default HomeScreen; // Exporta o componente para uso em outras partes da aplicação
