const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
require("../src/db/conn");
app.use(cors());

const customerRouter = require("./routers/customer");

app.use(express.json());

app.use(customerRouter);

app.listen(port, () => {
  console.log("Connection is stable at " + port);
});
