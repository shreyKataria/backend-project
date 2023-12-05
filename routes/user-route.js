const express = require("express");

const {
  getAllUsers,
  signUp,
  logIn,
} = require("../controllers/user-controller");
// import { getAllUsers } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/signup", signUp);

router.post("/login", logIn);

module.exports = router;
