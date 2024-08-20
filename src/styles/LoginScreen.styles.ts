import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
    borderRadius: 75,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',  // Garantir que o container de senha tenha a mesma largura do input
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 10,
  },
  forgotPasswordText: {
    color: '#6c757d',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
  },
  loginButton: {
    marginTop: 10,
  },
});

export default styles;