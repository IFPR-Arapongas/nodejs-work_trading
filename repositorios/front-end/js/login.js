import jwt from 'jsonwebtoken';
import { verificarToken } from "../../back-end/auth.js";

const SECRET = "minha_chave_secreta"; // coloque isso no .env

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Exemplo simples (use banco de dados na prática)
    if (email === "admin@email.com" && senha === "123") {
        const token = jwt.sign(
            { email },
            SECRET,
            { expiresIn: '1h' } 
        );

        return res.json({ token });
    }

    return res.status(401).json({ error: "Credenciais inválidas" });
});


app.get('/dados-secretos', verificarToken, (req, res) => {
    res.json({
        msg: "Acesso liberado!",
        usuario: req.user
    });
});