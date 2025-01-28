const express = require("express");
const multer = require("multer");
const tesseract = require("tesseract.js");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
const cors = require("cors");
app.use(cors());

// Configuração do multer para upload de múltiplos arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB por arquivo
}).fields([
  { name: "gabarito", maxCount: 1 },
  { name: "provas", maxCount: 10 }, // Aceita até 10 provas
]);

// Função para remover arquivos temporários com segurança
const safeUnlink = (filePath) => {
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      setTimeout(() => {
        fs.unlink(filePath, (err) => {
          if (err) {
            (`Erro ao remover arquivo: ${filePath}`, err);
          } else {
            (`Arquivo removido com sucesso: ${filePath}`);
          }
        });
      }, 1000);
    }
  });
};

// Rota para correção de prova
app.post("/api/corrigir-prova", (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: "Erro no upload de arquivos. Verifique os formatos e tamanhos." });
    } else if (err) {
      return res.status(500).json({ error: "Erro desconhecido no upload." });
    }

    if (!req.files || !req.files["gabarito"] || !req.files["provas"]) {
      return res.status(400).json({
        error: "Arquivos de gabarito e provas são necessários",
      });
    }

    const gabaritoPath = path.join(__dirname, req.files["gabarito"][0].path);
    const provasPaths = req.files["provas"].map((file) =>
      path.join(__dirname, file.path)
    );

    try {
      const resultados = [];

      for (const provaPath of provasPaths) {
        const processedGabaritoPath = `${gabaritoPath}-processed.jpg`;
        const processedProvaPath = `${provaPath}-processed.jpg`;

        try {
          await sharp(gabaritoPath).greyscale().toFile(processedGabaritoPath);
          await sharp(provaPath).greyscale().toFile(processedProvaPath);

          const gabaritoResult = await tesseract.recognize(processedGabaritoPath, "por");
          const provaResult = await tesseract.recognize(processedProvaPath, "por");

          const gabaritoRespostas = extrairRespostas(gabaritoResult.data.text);
          const provaRespostas = extrairRespostas(provaResult.data.text);
          const resultadoCorrecao = compararRespostas(gabaritoRespostas, provaRespostas);

          resultados.push({
            arquivo: path.basename(provaPath),
            resultado: resultadoCorrecao,
          });

          safeUnlink(processedGabaritoPath);
          safeUnlink(processedProvaPath);
        } catch (error) {
          console.error(`Erro ao processar arquivo ${provaPath}:`, error);
          resultados.push({
            arquivo: path.basename(provaPath),
            erro: "Erro ao processar a imagem",
          });
        }
      }

      safeUnlink(gabaritoPath);
      provasPaths.forEach((path) => safeUnlink(path));

      res.json({ resultados });
    } catch (error) {
      console.error("Erro no processamento:", error);
      res.status(500).json({ error: "Erro interno no processamento das imagens" });
    }
  });
});

// Função para extrair as respostas do texto reconhecido
const extrairRespostas = (texto) => {
  const respostas = [];
  const linhas = texto.split("\n");

  linhas.forEach((linha, index) => {
    const match = linha.match(/([A-D])\)/);
    if (match) {
      respostas.push({ questao: index + 1, resposta: match[1] });
    }
  });

  return respostas;
};

// Função para comparar as respostas
const compararRespostas = (gabaritoRespostas, provaRespostas) => {
  let pontuacaoTotal = 0;
  const resultado = [];

  for (let i = 0; i < gabaritoRespostas.length; i++) {
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

// Função para formatar o resultado do email
const formatarResultadoEmail = (resultados) => {
  return resultados
    .map(
      (resultado) =>
        `Arquivo: ${resultado.arquivo}\n` +
        resultado.resultado.resultado
          .map(
            (q) =>
              `Questão ${q.questao}: ${q.correta ? "Correta" : "Errada"} - Valor: ${q.valor}`
          )
          .join("\n") +
        `\nPontuação Total: ${resultado.resultado.pontuacaoTotal}`
    )
    .join("\n\n");
};

// Configuração do transporte de email
const enviarEmail = (email, resultadoJson) => {
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9317b59a972b50",
      pass: "f9b14115aac07a",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Resultado da Avaliação",
    text: formatarResultadoEmail(resultadoJson),
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      ("Erro ao enviar e-mail:", error);
    } else {
      ("E-mail enviado:", info.response);
    }
  });
};

// Rota para envio de resultados por e-mail
app.post("/api/enviar-resultado", (req, res) => {
  const { email, resultados } = req.body;

  if (!email || !resultados) {
    return res.status(400).json({ error: "E-mail e resultados são obrigatórios." });
  }

  try {
    enviarEmail(email, resultados);
    res.json({ message: "Resultados enviados com sucesso por e-mail!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Erro ao enviar e-mail!" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});