const express = require("express");
const apiRouter = express.Router();
const { mountainsRouter } = require("../Routers/mountainsRouter");
const { usersRouter } = require("../Routers/usersRouter");
const { getAPIDescription } = require("../Controllers/description-controller.js");
const { searchRouter } = require("./searchRouter");

apiRouter.use("/mountains", mountainsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/search", searchRouter);

apiRouter.route("/").get(getAPIDescription);

module.exports = { apiRouter };
