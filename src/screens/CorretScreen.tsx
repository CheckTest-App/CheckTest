import React, { useState } from "react";
import { View, Image, Alert, TouchableOpacity, Text } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import styles from "../styles/CorretScreen.style";

const HomeScreen = () => {
  // Hook para navegação, tipado corretamente com RootStackParamList
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Estado para simular a obtenção do email do banco de dados
  const [email] = useState<string>("usuario@exemplo.com");

  // Função para lidar com o envio de provas por e-mail
  const handleSendEmail = () => {
    Alert.alert(
      "Enviar Provas por E-mail",
      `Deseja enviar as provas para o e-mail: ${email}?`,
      [
        {
          text: "Enviar",
          onPress: () => alert("Provas enviadas para o e-mail!"),
          style: "default",
        },
        {
          text: "Cancelar",
          onPress: () => console.log("Envio cancelado"),
          style: "destructive",
        },
      ],
      { cancelable: true } // Permite cancelar o alerta tocando fora dele
    );
  };

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Você tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Logout cancelado"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }], // Reseta a pilha de navegação e volta para a tela de login
            });
          },
          style: "destructive", // Estilo do botão vermelho para indicar ação crítica
        },
      ],
      { cancelable: true } // Permite cancelar o alerta tocando fora dele
    );
  };

  return (
    <View style={styles.container}>
      {/* Exibe o logo da aplicação */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* Botão para navegar para a tela de correção de provas */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("TestUploadScreen")}
        >
          <Text style={styles.buttonText}>Corrigir Provas</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para acionar o envio de provas por e-mail com cor verde claro */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.emailButton]}
          onPress={handleSendEmail}
        >
          <Text style={styles.buttonText}>Enviar para Email</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para voltar para a tela de envio de provas com um tom de vermelho claro */}
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
    </View>
  );
};

export default HomeScreen;
