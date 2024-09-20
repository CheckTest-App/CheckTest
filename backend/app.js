const express = require("express");
const multer = require("multer");
const tesseract = require("tesseract.js");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const upload = multer({ dest: "uploads/" });

const cors = require("cors");
app.use(cors());

// Função de pré-processamento da imagem
const preprocessImage = async (inputPath, outputPath) => {
  try {
    await sharp(inputPath).greyscale().toFile(outputPath);
    console.log("Imagem processada com sucesso!");
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
  }
};

// Função para remover arquivos temporários
const safeUnlink = (filePath) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      setTimeout(() => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Erro ao remover arquivo: ${filePath}`, err);
          } else {
            console.log(`Arquivo removido com sucesso: ${filePath}`);
          }
        });
      }, 1000);
    } else {
      console.log(`Arquivo não acessível ou já removido: ${filePath}`);
    }
  });
};

// Rota para correção de prova
app.post(
  "/api/corrigir-prova",
  upload.fields([{ name: "gabarito" }, { name: "prova" }]),
  async (req, res) => {
    if (!req.files || !req.files["gabarito"] || !req.files["prova"]) {
      return res
        .status(400)
        .json({ error: "Arquivos de gabarito e prova são necessários" });
    }

    const gabaritoPath = path.join(__dirname, req.files["gabarito"][0].path);
    const provaPath = path.join(__dirname, req.files["prova"][0].path);

    try {
      const processedGabaritoPath = `${gabaritoPath}-processed.jpg`;
      const processedProvaPath = `${provaPath}-processed.jpg`;

      await preprocessImage(gabaritoPath, processedGabaritoPath);
      await preprocessImage(provaPath, processedProvaPath);

      const gabaritoResult = await tesseract.recognize(
        processedGabaritoPath,
        "por"
      );
      const provaResult = await tesseract.recognize(processedProvaPath, "por");

      const gabaritoTexto = gabaritoResult.data.text;
      const provaTexto = provaResult.data.text;

      const gabaritoRespostas = extrairRespostas(gabaritoTexto);
      const provaRespostas = extrairRespostas(provaTexto);

      const resultadoCorrecao = compararRespostas(
        gabaritoRespostas,
        provaRespostas
      );

      res.json({ resultado: resultadoCorrecao });

      safeUnlink(gabaritoPath);
      safeUnlink(provaPath);
      safeUnlink(processedGabaritoPath);
      safeUnlink(processedProvaPath);
    } catch (error) {
      console.error("Erro ao processar a imagem:", error);
      res.status(500).json({ error: "Erro ao processar as imagens" });
    }
  }
);

// Função para extrair as respostas do texto reconhecido
const extrairRespostas = (texto) => {
  const respostas = [];
  const linhas = texto.split("\n");

  linhas.forEach((linha, index) => {
    const match = linha.match(/([A-D])\)/);
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

  const numQuestoes = 5;

  for (let i = 0; i < numQuestoes; i++) {
    const gabarito = gabaritoRespostas[i];
    const prova = provaRespostas[i];

    if (gabarito && prova && gabarito.resposta === prova.resposta) {
      resultado.push({ questao: i + 1, correta: true, valor: 2 });
      pontuacaoTotal += 2;
    } else {
      resultado.push({ questao: i + 1, correta: false, valor: 0 });
    }
  }

  return { resultado, pontuacaoTotal };
};

// Função para formatar e enviar o e-mail com o resultado
const formatarResultadoEmail = (resultadoJson) => {
  let resultadoTexto = resultadoJson.resultado
    .map(
      (questao) =>
        `Questão ${questao.questao}: ${
          questao.correta ? "Correta" : "Errada"
        } - Valor: ${questao.valor} pontos`
    )
    .join("\n");

  resultadoTexto += `\n\nPontuação Total: ${resultadoJson.pontuacaoTotal} pontos`;

  return resultadoTexto;
};

const enviarEmail = (email, resultadoJson) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Resultado da Avaliação",
    text: formatarResultadoEmail(resultadoJson),
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

  if (!email || !resultado) {
    return res
      .status(400)
      .json({ error: "E-mail e resultado são obrigatórios." });
  }

  enviarEmail(email, resultado);

  res.json({ message: "Resultado enviado com sucesso por e-mail!" });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
