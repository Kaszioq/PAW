const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

// USERS
app.post("/users", async (req, res) => {
  try {
    const user = await prisma.user.create({ data: req.body });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.delete({ where: { id: parseInt(req.params.id) } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POSTS
app.post("/posts", async (req, res) => {
  try {
    const post = await prisma.post.create({ data: req.body });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({ where: { id: parseInt(req.params.id) }, include: { comments: true } });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ include: { comments: true } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const post = await prisma.post.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const post = await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// COMMENTS
app.post("/posts/:id/comments", async (req, res) => {
    try {
      const { text, authorId } = req.body;
      const postId = parseInt(req.params.id);
  
      // ✅ Validate incoming data
      if (!text || !authorId) {
        return res.status(400).json({ error: "Text and authorId are required." });
      }
  
      // ✅ Ensure post exists
      const postExists = await prisma.post.findUnique({ where: { id: postId } });
      if (!postExists) {
        return res.status(404).json({ error: "Post not found." });
      }
  
      // ✅ Ensure user exists
      const userExists = await prisma.user.findUnique({ where: { id: authorId } });
      if (!userExists) {
        return res.status(400).json({ error: "User does not exist." });
      }
  
      // ✅ Create the comment
      const newComment = await prisma.comment.create({
        data: { text, postId, authorId }
      });
  
      res.status(201).json(newComment);
    } catch (error) {
      console.error("❌ Error posting comment:", error);
      res.status(500).json({ error: error.message });
    }
  });
  

app.get("/posts/:id/comments", async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({ where: { postId: parseInt(req.params.id) } });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CATEGORIES
app.post("/categories", async (req, res) => {
  try {
    const category = await prisma.category.create({ data: req.body });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/categories/:id", async (req, res) => {
  try {
    const category = await prisma.category.findUnique({ where: { id: parseInt(req.params.id) } });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/categories/:id", async (req, res) => {
  try {
    const category = await prisma.category.update({ where: { id: parseInt(req.params.id) }, data: req.body });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/categories/:id", async (req, res) => {
  try {
    const category = await prisma.category.delete({ where: { id: parseInt(req.params.id) } });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
