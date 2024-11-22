const db = require("../models/queries");

async function newPostPost(req, res) {
  const title = req.body.title;
  const content = req.body.content;
  const tags = req.body.tags;
  const published = req.body.published;
  const userId = req.body.userId;
  try {
    await db.addNewPost(title, content, tags, published, userId);
  } catch (err) {
    console.error(err);
  }
}

async function getUserPosts(req, res) {
  const userData = req.user;
  try {
    const userPosts = await db.getPostsByUser(userData.id);
    res.status(200).json(userPosts);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { newPostPost, getUserPosts };
