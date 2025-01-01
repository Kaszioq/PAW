const express = require('express');
const fs = require('fs');
const url = require('url');
const pathM = require('path');
const mime = require('mime-types');
const { Prisma } = require('@prisma/client');

const app = express();

const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/users', async (req, res) => {
try {
    const user = await prisma.user.create({ data: req.body })
    res.json(user)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.get('/users/:id', async (req, res) => {
try {
    const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) }
    })
    res.json(user)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.get('/users', async (req, res) => {
try {
    const users = await prisma.user.findMany()
    res.json(users)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.put('/users/:id', async (req, res) => {
try {
    const user = await prisma.user.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
    })
    res.json(user)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.delete('/users/:id', async (req, res) => {
try {
    const user = await prisma.user.delete({
    where: { id: parseInt(req.params.id) }
    })
    res.json(user)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.post('/posts', async (req, res) => {
try {
    const post = await prisma.post.create({ data: req.body })
    res.json(post)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.get('/posts/:id', async (req, res) => {
try {
    const post = await prisma.post.findUnique({
    where: { id: parseInt(req.params.id) }
    })
    res.json(post)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.get('/posts', async (req, res) => {
try {
    const posts = await prisma.post.findMany()
    res.json(posts)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.put('/posts/:id', async (req, res) => {
try {
    const post = await prisma.post.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
    })
    res.json(post)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.delete('/posts/:id', async (req, res) => {
try {
    const post = await prisma.post.delete({
    where: { id: parseInt(req.params.id) }
    })
    res.json(post)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.post('/categories', async (req, res) => {
try {
    const category = await prisma.category.create({ data: req.body })
    res.json(category)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.get('/categories/:id', async (req, res) => {
try {
    const category = await prisma.category.findUnique({
    where: { id: parseInt(req.params.id) }
    })
    res.json(category)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.get('/categories', async (req, res) => {
try {
    const categories = await prisma.category.findMany()
    res.json(categories)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.put('/categories/:id', async (req, res) => {
try {
    const category = await prisma.category.update({
    where: { id: parseInt(req.params.id) },
    data: req.body
    })
    res.json(category)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.delete('/categories/:id', async (req, res) => {
try {
    const category = await prisma.category.delete({
    where: { id: parseInt(req.params.id) }
    })
    res.json(category)
} catch (error) {
    res.status(500).json({ error: error.message })
}
})

app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});