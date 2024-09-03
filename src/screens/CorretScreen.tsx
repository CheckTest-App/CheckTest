import React, { useContext, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { UserContext } from "../contexts/UserContext";
import CustomAlert from "../screens/CustomAlert";
import styles from "../styles/CorretScreen.style";

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
    : "email@exemplo.com";

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

  const handleSendEmail = () => {
    setAlertData({
      title: "Envio de Provas",
      message: `Provas enviadas para o e-mail: ${email}`,
      buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
    });
    setAlertVisible(true);
  };

  const handleCorrectTests = () => {
    setAlertData({
      title: "Provas Corrigidas",
      message: "As provas foram corrigidas com sucesso!",
      buttons: [{ text: "OK", onPress: () => setAlertVisible(false) }],
    });
    setAlertVisible(true);
  };

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
        source={require("../../assets/images/logo.png")}
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
    </View>
  );
};

export default HomeScreen;
