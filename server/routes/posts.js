const { Router } = require("express");
const db = require("../models/queries.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const posts = await db.getAllPosts();
    if (posts.length === 0) {
      return res.status(204).send();
    }
    res.json(posts);
  } catch (err) {
    console.error(err);
  }
});

router.post("/", (req, res) => {
  res.send("post posted");
});

router.get("/:postId", async (req, res) => {
  const id = parseInt(req.params.postId);
  try {
    const post = await db.getPostById(id);
    res.send(post);
  } catch (err) {
    console.error(err);
  }
});

router.post("/:postId/new-comment", async (req, res) => {
  const userId = req.body.userId || null;
  const postId = parseInt(req.params.postId);
  const comment = req.body.content;
  try {
    await db.addComment(comment, postId, userId);
    res.status(200).json({ message: "Comment added successfully!" });
  } catch (err) {
    console.error("Error posting comment", err);
  }
});

module.exports = router;
