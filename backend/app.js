const express = require("express");
const multer = require("multer");
const tesseract = require("tesseract.js");
const Jimp = require("jimp"); // Adicionando Jimp para pré-processamento de imagem
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Função de pré-processamento de imagem (ajuste de contraste, escala de cinza)
const preprocessImage = async (filePath) => {
  const image = await Jimp.read(filePath); // Jimp.read chamado corretamente
  await image
    .greyscale() // Converter para escala de cinza
    .contrast(1) // Aumentar o contraste
    .writeAsync(filePath); // Salvar a imagem processada
};

// Rota para correção de prova
app.post(
  "/api/corrigir-prova",
  upload.fields([{ name: "gabarito" }, { name: "prova" }]),
  async (req, res) => {
    const gabaritoPath = path.join(__dirname, req.files["gabarito"][0].path);
    const provaPath = path.join(__dirname, req.files["prova"][0].path);

    try {
      // Pré-processar a imagem
      await preprocessImage(gabaritoPath);
      await preprocessImage(provaPath);

      // Opções do Tesseract
      const tesseractOptions = {
        tessedit_pageseg_mode: tesseract.PSM.AUTO,
      };

      // Processar o gabarito e a prova com Tesseract.js
      const gabaritoResult = await tesseract.recognize(
        gabaritoPath,
        "por",
        tesseractOptions
      );
      const provaResult = await tesseract.recognize(
        provaPath,
        "por",
        tesseractOptions
      );

      const gabaritoTexto = gabaritoResult.data.text;
      const provaTexto = provaResult.data.text;

      console.log("Texto do gabarito:", gabaritoTexto);
      console.log("Texto da prova:", provaTexto);

      // Extrair respostas
      const gabaritoRespostas = extrairRespostas(gabaritoTexto);
      const provaRespostas = extrairRespostas(provaTexto);

      // Comparar as respostas e calcular o resultado
      const resultadoCorrecao = compararRespostas(
        gabaritoRespostas,
        provaRespostas
      );

      res.json({ resultado: resultadoCorrecao });

      fs.unlinkSync(gabaritoPath);
      fs.unlinkSync(provaPath);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao processar as imagens" });
    }
  }
);

// Função para extrair as respostas do texto reconhecido
const extrairRespostas = (texto) => {
  const respostas = [];
  const linhas = texto.split("\n");

  linhas.forEach((linha, index) => {
    // Melhorar o reconhecimento de alternativas preenchidas
    const match = linha.match(/●.*([A-D])/);
    if (match) {
      const alternativaCorreta = match[1];
      respostas.push({ questao: index + 1, resposta: alternativaCorreta });
    }
  });

  return respostas;
};

// Função para comparar as respostas da prova com o gabarito
const compararRespostas = (gabaritoRespostas, provaRespostas) => {
  let pontuacaoTotal = 0;
  const resultado = [];

  gabaritoRespostas.forEach((gabarito, index) => {
    const prova = provaRespostas[index];

    if (prova && gabarito.resposta === prova.resposta) {
      resultado.push({ questao: index + 1, correta: true, valor: 2 });
      pontuacaoTotal += 2; // Cada questão vale 2 pontos
    } else {
      resultado.push({ questao: index + 1, correta: false, valor: 0 });
    }
  });

  return { resultado, pontuacaoTotal };
};

// Função para enviar o e-mail com o resultado
const enviarEmail = (email, resultadoJson) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let resultadoTexto = resultadoJson.resultado
    .map(
      (questao) =>
        `Questão ${questao.questao}: ${
          questao.correta ? "Correta" : "Errada"
        } - Valor: ${questao.valor} pontos`
    )
    .join("\n");

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Resultado da Avaliação",
    text: `Segue o resultado da sua prova:\n\n${resultadoTexto}\n\nPontuação Total: ${resultadoJson.pontuacaoTotal} pontos`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Erro ao enviar e-mail:", error);
    } else {
      console.log("E-mail enviado:", info.response);
    }
  });
};

// Rota para enviar o resultado da prova por e-mail
app.post("/api/enviar-resultado", (req, res) => {
  const { email, resultado } = req.body;

  enviarEmail(email, resultado);

  res.json({ message: "Resultado enviado com sucesso por e-mail!" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});