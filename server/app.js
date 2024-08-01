require("dotenv").config()

require("./db")


const express = require("express");
const app = express();

const config = require("./config")
config(app)


app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const indexRouter = require("./routes/index.routes.js")
app.use("/api", indexRouter)

const errorHandling = require("./error-handling")
errorHandling(app)

module.exports = app