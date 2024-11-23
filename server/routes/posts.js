const { Router } = require("express");
const db = require("../models/queries.js");

const router = Router();

router.get("/", async (req, res) => {
  const posts = await db.getAllPosts();
  res.send(posts);
});

router.post("/", (req, res) => {
  res.send("post posted");
});

router.get("/:postId", async (req, res) => {
  const id = parseInt(req.params.postId);
  const post = await db.getPostById(id);
  res.send(post);
});

module.exports = router;
