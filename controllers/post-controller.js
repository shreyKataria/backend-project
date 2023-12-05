const { default: mongoose } = require("mongoose");
const postModel = require("../model/post-model");
const Users = require("../model/user-model");

const getAllPosts = async (req, res, next) => {
  let posts;
  // const {title , description , user} = req.body;
  try {
    posts = await postModel.find();
  } catch (error) {
    return console.log(error);
  }

  if (!posts) {
    return res.status(404).json({ message: " no posts found" });
  }
  return res.status(200).json({ posts });
};

const addPost = async (req, res, next) => {
  const { title, description, user } = req.body;

  let existingUser;
  try {
    existingUser = await Users.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: " No user found by this id" });
  }

  const newPost = new postModel({
    title,
    description,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPost.save({ session });
    existingUser.posts.push(newPost);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({ message: error });
  }
  if (newPost) {
    return res.status(200).json({ newPost });
  }
};

const updatePost = async (req, res, next) => {
  const { title, description } = req.body;

  const postId = req.params.id;

  let update;
  try {
    update = await postModel.findByIdAndUpdate(postId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }

  if (!update) {
    return res.status(500).json({ message: "unable to update" });
  }
  return res.status(200).json({ update });
};

const getPostsById = async (req, res, next) => {
  const id = req.params.id;

  let getPost;

  try {
    getPost = await postModel.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!getPost) {
    return res.status(404).json({ message: "no post found" });
  }
  return res.status(200).json({ getPost });
};

const deletePost = async (req, res, next) => {
  const id = req.params.id;
  let deletePost;
  try {
    deletePost = await postModel.findByIdAndDelete(id).populate("user");
    await deletePost.user.posts.pull(deletePost);
    await deletePost.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!deletePost) {
    return res.status(500).json({ message: "Something went wrong !" });
  }
  return res.status(200).json({ message: "Successfully delete " });
};

const getPostByUserId = async (req, res, next) => {
  const userId = req.params.id;

  let getPostById;
  try {
    getPostById = await Users.findById(userId).populate("posts");
  } catch (error) {
    return console.log(error);
  }
  if (!getPostById) {
    return res.status(404).json({ message: "post not found" });
  }
  return res.status(200).json({ posts: getPostById });
};
const posts = {
  getAllPosts,
  addPost,
  updatePost,
  getPostsById,
  deletePost,
  getPostByUserId,
};

module.exports = posts;
