const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile('./assets/index.html', (err, data) => {
        if (err) {
            res.end('Błąd odczytu pliku');
            return;
        }
        res.end(data);
    });
});

app.get('/o-nas', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile('./assets/about.html', (err, data) => {
        if (err) {
            res.end('Błąd odczytu pliku');
            return;
        }
        res.end(data);
    });
});

app.get('/oferta', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile('./assets/offers.html', (err, data) => {
        if (err) {
            res.end('Błąd odczytu pliku');
            return;
        }
        res.end(data);
    });
});

app.get('/kontakt', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    if (req.query.name || req.query.email || req.query.message) {
        console.log(`Imię: ${req.query.name}, Email: ${req.query.email}, Wiadomość: ${req.query.message}`);
    }

    fs.readFile('./assets/contact.html', (err, data) => {
        if (err) {
            res.end('Błąd odczytu pliku');
            return;
        }
        res.end(data);
    });
});

app.get('*', (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.readFile('./assets/pageNotFound.html', (err, data) => {
        if (err) {
            res.end('Błąd odczytu pliku');
            return;
        }
        res.end(data);
    });
});

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
