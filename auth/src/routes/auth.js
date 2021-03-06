const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send("Invalid email or password ");

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password ");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid email or password ");
  }

  const token = user.generateAuthToken();

  return res.status(200).send(token);
});

const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  });

  return schema.validate(user);
};

module.exports = router;
