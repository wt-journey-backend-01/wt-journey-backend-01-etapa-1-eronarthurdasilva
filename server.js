const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

//

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em localhost:${PORT}`);
});