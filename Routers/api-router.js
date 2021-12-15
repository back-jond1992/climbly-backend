const express = require("express");
const apiRouter = express.Router();
const { mountainsRouter } = require("../Routers/mountainsRouter");
const { usersRouter } = require("../Routers/usersRouter");
const { getAPI } = require("../Controllers/api");

apiRouter.use("/mountains", mountainsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.route("/").get(getAPI);

module.exports = { apiRouter };
