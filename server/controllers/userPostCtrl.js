const db = require("../models/queries");
const { JSDOM } = require("jsdom");
const createDOMPurify = require("dompurify");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

async function newPostPost(req, res) {
  const title = req.body.title;
  const content = req.body.content;
  const tags = req.body.tags;
  const published = req.body.published;
  const userId = req.body.userId;

  const sanitizedContent = DOMPurify.sanitize(content);

  try {
    await db.addNewPost(title, sanitizedContent, tags, published, userId);
    res.status(201).json({ message: "Post created successfully!" });
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

async function deletePost(req, res) {
  const postId = parseInt(req.params.postId);

  try {
    const post = await db.deletePostFromDb(postId);

    res.status(200).json({ message: "Post deleted!", post });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete", err });
  }
}

async function editPostGet(req, res) {
  const postId = parseInt(req.params.postId);
  try {
    const post = await db.getPostByIdForEdit(postId);
    res.status(200).json({ post });
  } catch (err) {
    console.error(err);
  }
}

async function updatePost(req, res) {
  const postId = parseInt(req.params.postId);
  const title = req.body.title;
  const content = req.body.content;
  const tags = req.body.tags;
  const published = req.body.published;
  try {
    const post = await db.updatePostById(
      postId,
      title,
      content,
      tags,
      published
    );
    res.status(200).json({ post });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  newPostPost,
  getUserPosts,
  deletePost,
  editPostGet,
  updatePost,
};
