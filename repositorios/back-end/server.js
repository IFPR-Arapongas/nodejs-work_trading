import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { verificarToken } from "./auth.js";

import { 
    getFornecedor,
    createFornecedor,
    removeFornecedor,
    updateFornecedor 
} from "./db.js";

dotenv.config();

const SECRET = process.env.SECRET;
const app = express();

app.use(express.json());

// ------------------------------
// LOGIN (gera token)
// ------------------------------
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (email === "teste@email.com" && senha === "123") {
        const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
        return res.json({ token });
    }

    res.status(401).json({ error: "Credenciais inválidas" });
});

// ------------------------------
// ROTA DE TESTE PROTEGIDA
// ------------------------------
app.get("/protegido", verificarToken, (req, res) => {
    res.json({ msg: "Você entrou!", usuario: req.user });
});

// ------------------------------
// ROTAS DE FORNECEDOR (PROTEGIDAS)
// ------------------------------
app.get("/Fornecedor", verificarToken, async (req, res) => {
    const fornecedores = await getFornecedor();
    res.status(200).json(fornecedores);
});

app.get("/Fornecedor/:id", verificarToken, async (req, res) => {
    const fornecedor = await getFornecedor(req.params.id);
    res.send(fornecedor);
});

app.post("/Fornecedor", verificarToken, async (req, res) => {
    const fornecedor = req.body;
    const id = await createFornecedor(fornecedor);
    res.status(201).send({ message: `Criado o fornecedor ${fornecedor.nome} ID: ${id}` });
});

app.delete("/Fornecedor/:id", verificarToken, async (req, res) => {
    await removeFornecedor(req.params.id);
    res.status(200).send({ mensagem: "Fornecedor removido com sucesso." });
});

app.put("/Fornecedor/:id", verificarToken, async (req, res) => {
    await updateFornecedor(req.params.id, req.body);
    res.status(200).send({ mensagem: `Fornecedor atualizado com sucesso.` });
});

// ------------------------------
// START SERVER
// ------------------------------
app.listen(3000, () => {
    console.log("Server running http://localhost:3000");
});