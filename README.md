
# CheckTest

CheckTest é um sistema de correção automática de provas utilizando OCR (Reconhecimento Óptico de Caracteres). Este projeto envolve o envio de gabaritos e provas através de uma interface móvel, processamento das imagens com Tesseract.js no backend, e envio de resultados por e-mail.

## Funcionalidades

- Upload de gabaritos e provas em formato de imagem.
- Processamento das imagens utilizando OCR (Tesseract.js) para extrair as respostas.
- Comparação automática das respostas das provas com o gabarito.
- Exibição da pontuação total da prova corrigida.
- Envio do resultado da correção por e-mail para o usuário.

## Tecnologias Utilizadas

### Frontend
- React Native com Expo
- Expo Image Picker para seleção de imagens
- Fetch API para enviar os dados ao backend

### Backend
- Node.js com Express
- Multer para upload de arquivos
- Tesseract.js para reconhecimento óptico de caracteres (OCR)
- Sharp para processamento de imagens
- Nodemailer para envio de e-mails
- CORS configurado para permitir o tráfego entre backend e frontend

## Instalação

### Pré-requisitos

- Node.js instalado na máquina
- Expo instalado no dispositivo ou emulador móvel
- Editor de código (VSCode recomendado)

### Passos para rodar o projeto

1. Clone o repositório:
   ```
   git clone https://github.com/SeuUsuario/CheckTest.git
   ```

2. Navegue até a pasta do backend e instale as dependências:
   ```
   cd backend
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta `backend` e adicione suas credenciais de e-mail e configurações:
     ```
     EMAIL=seu-email@gmail.com
     EMAIL_PASSWORD=sua-senha-de-email
     ```

4. Rode o servidor backend:
   ```
   node app.js
   ```

5. Navegue até a pasta do frontend e instale as dependências:
   ```
   cd ../frontend
   npm install
   ```

6. Inicie o Expo no frontend:
   ```
   expo start
   ```

7. Use o Expo Go (Android/iOS) ou um emulador para testar o aplicativo no celular.

## Como Usar

- Na tela inicial, o usuário pode fazer o upload de uma imagem do gabarito e da prova.
- Após o upload, o sistema processa as imagens e retorna a pontuação total junto com a correção de cada questão.
- O usuário pode optar por enviar os resultados por e-mail.
