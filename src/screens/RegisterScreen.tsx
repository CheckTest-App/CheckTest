import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { RegisterScreenNavigationProp } from '../navigation/types';
import styles from '../styles/LoginScreen.styles'; // Usando o mesmo estilo do LoginScreen para consistência

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleRegister = () => {
    // Lógica de registro
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={secureTextEntry}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Text style={styles.eyeIconText}>{secureTextEntry ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry={secureTextEntry}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Registrar" onPress={handleRegister} color="#007bff" />
      </View>

      <View style={[styles.buttonContainer, styles.loginButton]}>
        <Button title="Voltar ao Login" onPress={() => navigation.goBack()} color="#0056b3" />
      </View>
    </View>
  );
};

export default RegisterScreen;