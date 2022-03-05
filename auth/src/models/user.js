const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, "jwtPrivateKey");
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(255),
  });

  return schema.validate(user);
};

const User = new mongoose.model("Users", userSchema);

exports.User = User;
exports.userSchema = userSchema;
exports.validate = validateUser;
