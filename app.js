const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const postReceiver = require("./middleware/postData");
const resultsData = require("./middleware/results");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("backend");
});

app.post("/post", postReceiver);

app.post("/results", resultsData);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
