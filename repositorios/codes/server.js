import express from "express";
import jwt from "jsonwebtoken";
import { verificarToken } from "./auth.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;
const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (email === "teste@email.com" && senha === "123") {
        const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
        return res.json({ token });
    }

    res.status(401).json({ error: "Credenciais inválidas" });
});

app.get("/protegido", verificarToken, (req, res) => {
    res.json({ msg: "Você entrou!", usuario: req.user });
});

app.listen(3000);


import { getFornecedor, getFornecedor, createFornecedor, removeFornecedor, updateFornecedor } from './db.js';

app.use((req, res, next) => { 
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next(); 
})

app.use(express.static('public'))

app.use(express.json())

app.get('/Fornecedor', async (req, res) => {
    const Fornecedor = await getFornecedor()
    res.status(200).json(Fornecedor)
})

app.get('/Fornecedor/:id', async (req, res) => {
    const id = req.params.id;
    const Fornecedor = await getFornecedor(id)
    res.send(Fornecedor)
})

app.post('/Fornecedor', async (req, res) => {
    const Fornecedor = req.body
    const id = await createFornecedor(Fornecedor)
    res.status(201).send({ "message": `Criado o usuário ${Fornecedor.nome} ID: ${id}` })
})

app.delete('/Fornecedor/:id', async (req, res) => {
    const id = req.params.id
    const results = await removeFornecedor(id)
    res.status(200).send({"mensagem": `Usuário removido com sucesso.`})
})

app.put('/Fornecedor/:id', async (req, res) => {
    const Fornecedor = req.body
    const id = req.params.id
    const results = await updateFornecedor(id, Fornecedor)
    res.status(200).send({"mensagem" : `Usuário ${Fornecedor.nome} ID ${id} foi atualizado.`})
})

app.listen(3000, () => {
    console.log('Server running http://localhost:3000')
})
