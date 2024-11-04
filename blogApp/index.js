const express = require('express');
const fs = require('fs');
const url = require('url');
const pathM = require('path');
const mime = require('mime-types');

const app = express();

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})