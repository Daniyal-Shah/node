const config = require("config");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
require("../src/db/conn");
const errorMiddleware = require("../src/middlewares/error");
require("express-async-errors");
const winston = require("winston");

if (!config.get("jwtPrivateKey")) {
  // console.error("FATAL ERROR : jwtPrivateKey is not defined");
  // process.exit(1);
}

const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log("Connection is stable at " + port);
});
