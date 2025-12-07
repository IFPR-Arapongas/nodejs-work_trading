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