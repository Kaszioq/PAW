const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'express_web',
});

db.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych:', err);
  } else {
    console.log('Połączono z bazą danych MySQL.');
  }
});

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

app.post('/api/contact-messages', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Wszystkie pola są wymagane.' });
    }

    const query = 'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
        console.error('Błąd przy zapisywaniu wiadomości:', err);
        return res.status(500).json({ error: 'Nie udało się zapisać wiadomości.' });
        }
        res.redirect('/');
    });
});  

app.get('/api/contact-messages', (req, res) => {
  const query = 'SELECT * FROM messages';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Błąd przy pobieraniu wiadomości:', err);
      return res.status(500).json({ error: 'Nie udało się pobrać wiadomości.' });
    }
    res.json(results);
  });
});

app.get('/api/contact-messages/:id', (req, res) => {
  const messageId = req.params.id;
  const query = 'SELECT * FROM messages WHERE id = ?';

  db.query(query, [messageId], (err, results) => {
    if (err) {
      console.error('Błąd przy pobieraniu wiadomości:', err);
      return res.status(500).json({ error: 'Nie udało się pobrać wiadomości.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Wiadomość o podanym ID nie istnieje.' });
    }

    res.json(results[0]);
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
