const db = require("../models/db");

async function findUsername(username) {
  await Prisma.user.findUnique({
    where: {
      username: username,
    },
  });
}

async function createUser(username, password) {
  const user = await Prisma.user.create({
    data: {
      username,
      password,
    },
  });
}
