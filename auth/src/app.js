const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
require("../src/db/conn");
const userRouter = require("./routes/users");

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Connection is stable at " + port);
});
