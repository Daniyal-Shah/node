const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/auth", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Handling-errors Database Connected ");
  })
  .catch((e) => {
    console.log(e);
  });
