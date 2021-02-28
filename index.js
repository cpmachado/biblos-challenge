const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

const baseMiddlewares = [
  bodyParser.json({
    limit: "20mb"
  })
]

let articles = require("./data/articles.json");

app.listen(port, () => console.log(`App listening on http://127.0.0.1:${port}`));