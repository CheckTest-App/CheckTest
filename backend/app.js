const express = require("express");
const multer = require("multer");
const tesseract = require("tesseract.js");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para receber dados em JSON no corpo das requisições

// Configuração do Multer para upload de múltiplas imagens
const upload = multer({ dest: "uploads/" });

// Rota para correção de prova
app.post(
  "/api/corrigir-prova",
  upload.fields([{ name: "gabarito" }, { name: "prova" }]),
  async (req, res) => {
    const gabaritoPath = path.join(__dirname, req.files["gabarito"][0].path);
    const provaPath = path.join(__dirname, req.files["prova"][0].path);

    try {
      // Extração do texto do gabarito e da prova usando Tesseract
      const gabaritoResult = await tesseract.recognize(gabaritoPath);
      const gabaritoTexto = gabaritoResult.data.text;

      const provaResult = await tesseract.recognize(provaPath);
      const provaTexto = provaResult.data.text;

      // Extrair as respostas do gabarito e da prova
      const gabaritoRespostas = extrairRespostas(gabaritoTexto);
      const provaRespostas = extrairRespostas(provaTexto);

      // Comparar as respostas e calcular o resultado
      const resultadoCorrecao = compararRespostas(
        gabaritoRespostas,
        provaRespostas
      );

      res.json({ resultado: resultadoCorrecao });

      // Remover arquivos temporários
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
    if (
      linha.includes("A)") ||
      linha.includes("B)") ||
      linha.includes("C)") ||
      linha.includes("D)")
    ) {
      // Extrai a alternativa marcada (A, B, C, D)
      const alternativaCorreta = linha.match(/[A-D]\)/)[0].charAt(0);
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
    service: "gmail", // Ou outro serviço de e-mail
    auth: {
      user: process.env.EMAIL, // Seu e-mail
      pass: process.env.EMAIL_PASSWORD, // Sua senha de e-mail
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
    to: email, // E-mail do destinatário
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

  // Envia o e-mail com o resultado
  enviarEmail(email, resultado);

  res.json({ message: "Resultado enviado com sucesso por e-mail!" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});