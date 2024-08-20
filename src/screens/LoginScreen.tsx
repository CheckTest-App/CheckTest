import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { LoginScreenNavigationProp } from '../navigation/types';
import styles from '../styles/LoginScreen.styles';

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = () => {
    // Lógica de login
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}  // Usando o mesmo estilo do input de usuário
          placeholder="Senha"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Text>{secureTextEntry ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPasswordText}>Esqueci a senha</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Cadastrar-se" onPress={() => navigation.navigate('Register')} color="#007bff" />
      </View>
      <View style={[styles.buttonContainer, styles.loginButton]}>
        <Button title="Fazer login" onPress={handleLogin} color="#0056b3" />
      </View>
    </View>
  );
};

export default LoginScreen;