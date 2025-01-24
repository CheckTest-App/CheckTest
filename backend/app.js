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

    try {
      const resultados = [];
  
      for (const element of req.files["prova"]) {
        const provaPath = path.join(__dirname, element.path);
        const processedGabaritoPath = `${gabaritoPath}-processed.jpg`;
        const processedProvaPath = `${provaPath}-processed.jpg`;
  
        try {
          // Pré-processamento das imagens
          await preprocessImage(gabaritoPath, processedGabaritoPath);
          await preprocessImage(provaPath, processedProvaPath);
  
          // Reconhecimento de texto com Tesseract
          const gabaritoResult = await tesseract.recognize(
            processedGabaritoPath,
            "por"
          );
          const provaResult = await tesseract.recognize(processedProvaPath, "por");
  
          // Extração e comparação de respostas
          const gabaritoRespostas = extrairRespostas(gabaritoResult.data.text);
          const provaRespostas = extrairRespostas(provaResult.data.text);
          const resultadoCorrecao = compararRespostas(
            gabaritoRespostas,
            provaRespostas
          );
  
          // Adicionar o resultado ao array de resultados
          resultados.push({ arquivo: element.filename, resultado: resultadoCorrecao });
  
          // Opção para limpar arquivos temporários
          safeUnlink(gabaritoPath);
          safeUnlink(provaPath);
          safeUnlink(processedGabaritoPath);
          safeUnlink(processedProvaPath);
        } catch (fileError) {
          console.error(`Erro ao processar o arquivo ${element.filename}:`, fileError);
          resultados.push({ arquivo: element.filename, erro: "Erro ao processar a imagem" });
        }
      }
  
      // Envia todos os resultados após o processamento completo
      res.json({ resultados });
    } catch (error) {
      console.error("Erro geral:", error);
      res.status(500).json({ error: "Erro interno no processamento das imagens" });
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
  let resultadoTexto = resultadoJson
    .map(
      (resultadoArquivo) => {
        const arquivo = resultadoArquivo.arquivo;
        const questoesTexto = resultadoArquivo.resultado.resultado
          .map(
            (questao) =>
              `Questão ${questao.questao}: ${
                questao.correta ? "Correta" : "Errada"
              } - Valor: ${questao.valor} pontos`
          )
          .join("\n");

        return `Arquivo: ${arquivo}\n${questoesTexto}\nPontuação Total: ${resultadoArquivo.resultado.pontuacaoTotal} pontos`;
      }
    )
    .join("\n\n");

  return resultadoTexto;
};

const enviarEmail = (email, resultadoJson) => {
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: "2525",
    secure: false,
    auth: {
      user: "9317b59a972b50",
      pass: "f9b14115aac07a",
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
  console.log(req.body);
  const { email, resultados } = req.body;

  if (!email || !resultados) {
    return res
      .status(400)
      .json({ error: "E-mail e resultados são obrigatórios." });
  }

  console.log(resultados);

  try {
    enviarEmail(email, resultados);
    res.json({ message: "Resultados enviado com sucesso por e-mail!" });
  } catch (error) {
    console.error(error);
    res.json({ message: "Erro ao enviar e-mail!" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

// Iniciar o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
