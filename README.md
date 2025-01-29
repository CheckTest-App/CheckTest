
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
   git clone https://github.com/CheckTest-App/CheckTest.git
   ```

2. Navegue até a pasta do backend e instale as dependências:
   ```
   cd backend
   npm install
   ```

4. Rode o servidor backend:
   ```
   npm run start
   ```

5. Navegue até a pasta do frontend e instale as dependências:
   ```
   cd ../frontend
   npm install
   ```

6. Inicie o Expo no frontend:
   ```
   npm start
   ```

7. Use o Expo Go (Android/iOS) ou um emulador para testar o aplicativo no celular.

## Como Usar

- Após realizar o cadastro de usuário, seguir com o upload de gabarito e prova para avaliação.
- Na tela inicial após cadastro, o usuário pode fazer o upload de uma imagem do gabarito e da prova.
- Após o upload, o sistema processa as imagens e retorna a pontuação total junto com a correção de cada questão via e-mail, necessário seguir com a confirmação do e-mail.
- O usuário pode consultar o envio do e-mail via mailtrap para confirmação do recebimento.
- Obs: inserir no arquivo api.ts em frontend/src/services o ip referente ao ip da máquina local para teste. 
- Pode ser consultado via comando, abra o terminal e digite 'ipconfig', o ip referente ao Endereço IPv4 deve ser inserido. 
- Exemplo: http://192.168.1.100 , deixar com o padrão de porta 4004 e caminho /api http:// SEU IPCONFIG IPV4:4004/api.
- Em Documentos possui a prova modelo para testes, realizar o download no celular android para fazer a validação.
