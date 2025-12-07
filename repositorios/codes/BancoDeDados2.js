import mysql from "mysql2/promise";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "meubanco"
});

export default db;

import express from "express";
import db from "./db.js";

const app = express();
app.use(express.json());

app.get("/usuarios", async (req, res) => {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
});

app.listen(3000);