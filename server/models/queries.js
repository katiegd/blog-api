const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function findUsername(username) {
  await prisma.user.findUnique({
    where: {
      username: username,
    },
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

module.exports = {
  findUsername,
  createUser,
};
