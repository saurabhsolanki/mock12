const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./Models/User.model");
const EmiRouter = require("./Routes/emi.route");
const authorization = require("./middlewares/authorization");
require("dotenv").config();
const PORT = process.env.PORT || 9000;
const URL = process.env.URL || "";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welocme To OUR Home Page");
});

//Signup User
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const isUser = await UserModel.findOne({ email });
  // res.send(req.body)
  if (isUser) {
    res.send({ msg: "Users already exists, please Use different ID Password" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res.send({ msg: "Something went wrong! Plese Try again " });
      }
      const new_user = new UserModel({ username, email, password: hash });
      try {
        await new_user.save();
        res.send({ msg: "Signup Successfull" });
      } catch (error) {
        res.send({ msg: "Something went wrong" });
      }
    });
  }
});

//Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash_pass = user.password;
  const user_id = user._id;
  bcrypt.compare(password, hash_pass, function (err, result) {
    if (err) {
      res.send({ msg: "Something went wrong" });
    }
    if (result) {
      const token = jwt.sign({ user_id }, "secret123");
      res.send({ msg: "login successfull Now You can enjoy your personal work space", token });
    } else {
      res.send({ msg: "login failed,try again" });
    }
  });
});

app.post("/profile", async (req, res) => {
  let _id = req.headers.authorization;
  console.log(_id,"idtoken")
  let user = await UserModel.findById(_id);
  console.log(user)
  res.send(user);
});

// app.use(authorization);
app.use("/user", EmiRouter);

//Connection
app.listen(PORT, async() => {
  await mongoose.connect(URL)
  console.log(`server started on port ${PORT}`)
})
