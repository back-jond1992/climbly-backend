const express = require("express");
const app = express();
const { apiRouter } = require("./Routers/api-router");
const cors = require('cors');
const {handleCustomErrors} = require('./Controllers/error-handlers')

app.use(express.json());
app.use(cors())
app.use("/api", apiRouter);

//handle 404 errors
app.all("*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use(handleCustomErrors)

// handle 500 errors
app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
