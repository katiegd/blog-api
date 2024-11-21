const db = require("../models/queries");

async function newPostPost(req, res) {
  console.log(req.body);

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

module.exports = { newPostPost };
