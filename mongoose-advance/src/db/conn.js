const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/nodePractice", {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });
