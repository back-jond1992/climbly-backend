const express = require("express");
const apiRouter = express.Router();
const { mountainsRouter } = require("../Routers/mountainsRouter");
const { usersRouter } = require("../Routers/usersRouter");
const { getAPIDescription } = require("../Controllers/description-controller.js");

apiRouter.use("/mountains", mountainsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.route("/").get(getAPIDescription);

module.exports = { apiRouter };
