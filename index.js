const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-route");
const postRouter = require("./routes/post-routes");

const PORT = 3000;

// initialise app
const app = express();

// middlewares
app.use(express.json());

// user router
app.use("/api/user", router);

// blog router
app.use("/api/blogs", postRouter);

// db connection
mongoose
  .connect(
    "mongodb+srv://shreykataria185:XIc9jfh01SVTpwRO@backend-cluster.okwkryp.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Connected to db and app is listening to Port : ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
