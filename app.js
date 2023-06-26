const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("backend");
});

app.post("/post", (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
