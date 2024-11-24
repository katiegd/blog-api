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

async function getPostById(postId) {
  return prisma.post.findFirst({
    where: {
      id: postId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
      comments: {
        select: {
          content: true,
          createdAt: true,
          user: {
            select: {
              username: true,
            },
          },
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

async function deletePostFromDb(postId) {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
}

async function getPostByIdForEdit(postId) {
  return prisma.post.findFirst({
    where: {
      id: postId,
    },
  });
}

async function updatePostById(postId, title, content, tags, published) {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      content,
      tags,
      published,
    },
  });
}

async function addComment(comment, postId, userId) {
  await prisma.comment.create({
    data: {
      content: comment,
      post: {
        connect: { id: postId },
      },
      user: userId
        ? {
            connect: { id: userId },
          }
        : undefined,
    },
  });
}

module.exports = {
  findUsername,
  findUserById,
  createUser,
  getAllPosts,
  getPostById,
  addNewPost,
  getPostsByUser,
  deletePostFromDb,
  getPostByIdForEdit,
  updatePostById,
  addComment,
};
