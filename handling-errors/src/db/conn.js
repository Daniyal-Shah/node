const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/auth", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("AUTH Database Connected ");
  })
  .catch((e) => {
    console.log(e);
  });
