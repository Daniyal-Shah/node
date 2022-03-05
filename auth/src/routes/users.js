const { userSchema, User, validate } = require("../models/user");
const _ = require("lodash");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  res.send([]);
});

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  await user.save();

  res.status(200).send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
