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
    borderRadius: 20,
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10, // Adicionado para consistência
    borderRadius: 8, // Garantir que o input tenha bordas arredondadas
    backgroundColor: '#fff',
  },
  eyeIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10, // Espaço entre o ícone e o campo de senha
  },
  eyeIconText: {
    fontSize: 18,
    color: '#000', // Cor do ícone para garantir visibilidade
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