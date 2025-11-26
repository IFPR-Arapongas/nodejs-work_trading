import express from 'express'
import { getFornecedor, getFornecedor, createFornecedor, removeFornecedor, updateFornecedor } from './db.js';
const app = express()

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