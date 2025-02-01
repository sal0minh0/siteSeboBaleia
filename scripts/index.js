const {MongoClient} = require('mongodb');

const username = 'salominho';
const password = 'gvaOuL5TarQJxu6g';
const cluster = 'LivrosNovosSebo';
const dbname = 'NovosLivrosSebo';
const collectionName = 'sites';

const url = 'mongodb+srv://salominho:gvaOuL5TarQJxu6g@livrosnovossebo.vfjfx.mongodb.net/?retryWrites=true&w=majority&appName=LivrosNovosSebo';
const client = new MongoClient(url);