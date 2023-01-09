const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("./jsonwebtoken");

//CREATE POST

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//ALL POSTS
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Post.find().sort({ _id: -1 }).limit(5)
      : await Post.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
