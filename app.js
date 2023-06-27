const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mainProcces = require("./middleware/main");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("backend");
});

app.post("/post", mainProcces, (req, res) => {
  res.status(200).send("succes");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
