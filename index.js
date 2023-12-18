require("dotenv").config();
const express = require("express");

const mdbConnection = require("./config/mdbConnection.js");
const routes = require("./routes");
var cors = require("cors");
const app = express();

app.use(express.urlencoded({ express: true }));
app.use(cors());
mdbConnection();
app.use(express.json());
app.use(routes);

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8000);
