const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para arquivos estáticos e para ler body de formulários
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Página de contato (GET)
app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

// Processa formulário de contato (POST)
app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    res.send(`
        <h1>Obrigado pelo contato!</h1>
        <p>Nome: ${nome}</p>
        <p>Email: ${email}</p>
        <p>Assunto: ${assunto}</p>
        <p>Mensagem: ${mensagem}</p>
        <a href="/">Voltar ao cardápio</a>
    `);
});

// Página de agradecimento da sugestão
app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;
    res.send(`
        <h1>Obrigado pela sugestão!</h1>
        <p>Nome do lanche: ${nome}</p>
        <p>Ingredientes: ${ingredientes}</p>
        <a href="/">Voltar ao cardápio</a>
    `);
});

/* api de lanches*/
// API de lanches com validação
app.get('/api/lanches', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'data', 'lanches.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo de lanches');
        const lanches = JSON.parse(data);

        // Validação dos lanches
        const invalid = lanches.some(lanche =>
            !lanche.id || !lanche.nome || !lanche.ingredientes
        );
        if (invalid) {
            return res.status(400).send('Erro: Cada lanche deve ter id, nome e ingredientes válidos.');
        }

        res.json(lanches);
    });
});
// API de lanches
app.get('/api/lanches', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'data', 'lanches.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler o arquivo de lanches');
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});