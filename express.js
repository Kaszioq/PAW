const express = require('express');
const fs = require('fs');
const url = require('url');
const pathM = require('path');
const mime = require('mime-types');

const app = express();

const port = 3000

app.get('/1', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Strona główna');
}
);

app.get('/2', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('package.json', 'utf8', (err, data) => {
        if (err) {
            res.end('Error reading package.json');
        }
        res.end(data);
    });
}
);

app.get('/3', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<html><body><h1>Hello, World!</h1></body></html>');
}
);

app.get('/4', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.end('Błąd odczytu pliku');
            return;
        }
        res.end(data);
    })
}
);

app.get('/get_params', (req, res) => {
    const queryParams = url.parse(req.url, true).query;
    const filename = `params_${Date.now()}.json`;
    fs.writeFileSync
    (filename, JSON.stringify(queryParams));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: 'ok' }));
}
);

app.get('*', (req, res) => {
    const filePath = pathM.join(__dirname, 'assets', req.url);
    try{
        const mimeType = mime.lookup(filePath);
        res.writeHead(200, { 'Content-Type': mimeType });
        fs.readFile(filePath, (err, data)=>{
            if(err){
                res.end('File not found');
                return;
            }
            res.end(data);
        })
    } catch(e){
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File not found' }));
        return;
    }
}
);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});