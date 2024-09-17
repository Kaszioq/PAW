const { createServer } = require('node:http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  fs.readFile('package.json', 'utf8', (err, data) => {
    if (err) {
        res.end('Error reading package.json');
    }
    res.end(data);
});
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
