import mysql from "mysql2/promise";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "meubanco"
});

console.log("Banco de dados conectado!");

export default db;

// Funções do CRUD
export async function getFornecedor(id = null) {
    if (id) {
        const [rows] = await db.query("SELECT * FROM fornecedores WHERE id = ?", [id]);
        return rows[0];
    }
    const [rows] = await db.query("SELECT * FROM fornecedores");
    return rows;
}

export async function createFornecedor(data) {
    const { nome, email } = data;
    const [result] = await db.query(
        "INSERT INTO fornecedores (nome, email) VALUES (?, ?)",
        [nome, email]
    );
    return result.insertId;
}

export async function removeFornecedor(id) {
    const [result] = await db.query("DELETE FROM fornecedores WHERE id = ?", [id]);
    return result;
}

export async function updateFornecedor(id, data) {
    const { nome, email } = data;
    const [result] = await db.query(
        "UPDATE fornecedores SET nome = ?, email = ? WHERE id = ?",
        [nome, email, id]
    );
    return result;
}