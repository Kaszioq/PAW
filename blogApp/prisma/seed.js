const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com"
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com"
    }
  });

  const category1 = await prisma.category.create({
    data: { name: "Technology" }
  });

  const category2 = await prisma.category.create({
    data: { name: "Lifestyle" }
  });

  const post1 = await prisma.post.create({
    data: {
      title: "Mastering React Hooks: The Ultimate Guide",
      content: `
        React Hooks have revolutionized the way we write components in React.
        With hooks, we can manage state, side effects, and context more efficiently.
        In this guide, we'll explore useState, useEffect, useReducer, and other 
        essential hooks with real-world examples and best practices.
      `,
      authorId: user1.id,
      categoryId: category1.id
    }
  });

  const post2 = await prisma.post.create({
    data: {
      title: "10 Essential Lifestyle Habits for a Healthier Life",
      content: `
        A healthy lifestyle is a combination of good habits that contribute to 
        your well-being. These habits include regular exercise, balanced diet, 
        mindfulness practices, and maintaining social connections. In this 
        article, we'll break down ten science-backed lifestyle changes that can 
        dramatically improve your quality of life.
      `,
      authorId: user2.id,
      categoryId: category2.id
    }
  });

  const post3 = await prisma.post.create({
    data: {
      title: "Why AI is the Future of Technology",
      content: `
        Artificial Intelligence (AI) is transforming every industry, from healthcare 
        to finance. This article explores how AI is shaping the future with 
        machine learning, automation, and deep learning advancements.
      `,
      authorId: user1.id,
      categoryId: category1.id
    }
  });

  await prisma.comment.createMany({
    data: [
      { text: "Great post! I learned a lot.", postId: post1.id, authorId: user2.id },
      { text: "This was very helpful, thanks!", postId: post1.id, authorId: user1.id },
      { text: "Love these tips! Looking forward to more.", postId: post2.id, authorId: user1.id },
      { text: "AI is fascinating. I totally agree!", postId: post3.id, authorId: user2.id }
    ]
  });

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Error in seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
