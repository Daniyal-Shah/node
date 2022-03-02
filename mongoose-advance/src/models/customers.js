const express = require("express");
const mongoose = require("mongoose");

const customersSchema = new mongoose.Schema({
  customerId: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    unique: false,
    validate: {
      validator: function (v) {
        return v && v.length >= 8;
      },
      message: "Password must have at least 8 letter",
    },
  },
});

const Customers = new mongoose.model("Customers", customersSchema);

module.exports = Customers;
