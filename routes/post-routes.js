const express = require("express");

const {
  getAllPosts,
  addPost,
  updatePost,
  getPostsById,
  deletePost,
  getPostByUserId,
} = require("../controllers/post-controller");
// import { getAllUsers } from "../controllers/user-controller";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);

postRouter.post("/add", addPost);

postRouter.put("/update/:id", updatePost);

postRouter.get("/:id", getPostsById);

postRouter.delete("/:id", deletePost);

postRouter.get("/user/:id", getPostByUserId);

module.exports = postRouter;
