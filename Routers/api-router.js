const express = require("express");
const apiRouter = express.Router();
const {mountainsRouter} = require('../Routers/mountainsRouter')
const {getAPIDescription} = require('../Controllers/description-controller.js')



apiRouter.use("/mountains", mountainsRouter);


apiRouter.route("/").get(getAPIDescription);

module.exports = { apiRouter };
