const { User, validate } = require("../models/user");
const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const auth_middleware = require("../middlewares/auth");
const admin_middleware = require("../middlewares/admin");

//to check if the user is admin or not with admin middleware created
router.get("/admin", [auth_middleware, admin_middleware], async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//Authorization
// To get current user with x-auth-token
router.get("/me", auth_middleware, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .status(200)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
