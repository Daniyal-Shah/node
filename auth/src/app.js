const express = require("express");
const app = express();

const cors = require("cors");
const port = process.env.PORT || 8000;
require("../src/db/conn");

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.listen(port, () => {
  console.log("Connection is stable at " + port);
});
