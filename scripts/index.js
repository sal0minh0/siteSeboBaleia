const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Configurações do MongoDB
const uri = 'process.env.MONGODB_URI';
const dbname = 'novoslivros';
const collectionName = 'livros';
const client = new MongoClient(uri);

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../outras_paginas'))); // Servir arquivos estáticos (HTML, CSS, JS)

// Rota para exibir o formulário HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../outras_paginas/novoslivros.html'));
});

// Rota para processar o envio do formulário e inserir livro
app.post('/inserir-livro', async (req, res) => {
    const { livro, autor } = req.body; // Captura os dados do formulário

    if (!livro || !autor) {
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    try {
        await client.connect();
        const db = client.db(dbname);
        const collection = db.collection(collectionName);

        // Inserir o novo livro no MongoDB
        const novoLivro = { livro, autor };
        const resultadoInsercao = await collection.insertOne(novoLivro);
        console.log('Livro inserido:', resultadoInsercao.insertedId);

        res.send('Livro inserido com sucesso!');
    } catch (error) {
        console.error('Erro ao inserir livro:', error);
        res.status(500).send('Erro ao inserir livro.');
    }
});

// Rota para listar todos os livros
app.get('/listar-livros', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbname);
        const collection = db.collection(collectionName);

        // Listar todos os livros
        const livros = await collection.find({}).toArray();
        res.json(livros);
    } catch (error) {
        console.error('Erro ao listar livros:', error);
        res.status(500).send('Erro ao listar livros.');
    } finally {
        await client.close();
    }
});

// Rota para atualizar um livro
app.put('/atualizar-livro/:id', async (req, res) => {
    const { id } = req.params;
    const { livro, autor } = req.body;

    if (!livro || !autor) {
        return res.status(400).send('Por favor, preencha todos os campos.');
    }

    try {
        await client.connect();
        const db = client.db(dbname);
        const collection = db.collection(collectionName);

        // Atualizar o livro no MongoDB
        const filtroAtualizacao = { _id: new MongoClient.ObjectID(id) };
        const atualizacao = { $set: { livro, autor } };
        await collection.updateOne(filtroAtualizacao, atualizacao);
        console.log('Livro atualizado:', id);

        res.send('Livro atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).send('Erro ao atualizar livro.');
    } finally {
        await client.close();
    }
});

// Rota para remover um livro
app.delete('/remover-livro/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await client.connect();
        const db = client.db(dbname);
        const collection = db.collection(collectionName);

        // Remover o livro no MongoDB
        const filtroRemocao = { _id: new MongoClient.ObjectID(id) };
        await collection.deleteOne(filtroRemocao);
        console.log('Livro removido:', id);

        res.send('Livro removido com sucesso!');
    } catch (error) {
        console.error('Erro ao remover livro:', error);
        res.status(500).send('Erro ao remover livro.');
    } finally {
        await client.close();
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


// Listar todos os livros
//const livros = await collection.find({}).toArray(); // Dar um find pegar as coleções no {} (objeto sem padrao de busca) e transformar num array, se quiser buscar no seu banco insira algo no {}
//console.log('Lista de livros:', livros); // Exibir o vetor nesse log

// Atualizar um livro
//const filtroAtualizacao = { _id: resultadoInsercao.insertedId };
//const atualizacao = { $set: { livro: 'Senhor dos Aneis', autor: 'Tolkien'} };
//await collection.updateOne(filtroAtualizacao, atualizacao);
//console.log('Site atualizado');

// Remover um livro
//const filtroRemocao = { _id: resultadoInsercao.insertedId};
//await collection.deleteOne(filtroRemocao);
//console.log('Site removido');