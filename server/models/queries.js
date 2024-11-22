const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findUsername(username) {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
}

async function findUserById(userId) {
  return await prisma.user.findFirst({
    where: { id: userId },
  });
}

async function createUser(username, password) {
  await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

async function getAllPosts() {
  return prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });
}

async function getPostsByUser(userId) {
  return prisma.post.findMany({
    where: {
      userId: userId,
    },
  });
}

async function addNewPost(title, content, tags, published, userId) {
  return prisma.post.create({
    data: {
      title,
      content,
      tags,
      published,
      user: {
        connect: { id: userId },
      },
    },
  });
}

module.exports = {
  findUsername,
  findUserById,
  createUser,
  getAllPosts,
  addNewPost,
  getPostsByUser,
};
