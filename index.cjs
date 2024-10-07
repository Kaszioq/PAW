const { createServer } = require('node:http');
const fs = require('fs');
const url = require('url');
const pathM = require('path');
const mime = require('mime-types');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  if(req.url.startsWith('/1')){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Strona główna');
    return;
  }
  if(req.url.startsWith('/2')){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    fs.readFile('package.json', 'utf8', (err, data) => {
        if (err) {
            res.end('Error reading package.json');
        }
        res.end(data);
    });
    return;
  }
  if(req.url.startsWith('/3')){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<html><body><h1>Hello, World!</h1></body></html>');
    return;
  }
  if(req.url.startsWith('/4')){
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    fs.readFile('index.html', (err, data) => {
        if (err) {
        res.end('Błąd odczytu pliku');
        return;
        }
        res.end(data);
    })
    return;
  }
  if(req.url.startsWith('/get_params')){
    const queryParams = url.parse(req.url, true).query;
    const filename = `params_${Date.now()}.json`;
    fs.writeFileSync(filename, JSON.stringify(queryParams));
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: 'ok' }));
    return;
  }
  else{
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
  };
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
