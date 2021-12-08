const express = require("express");
const usersRouter = express.Router();
const { getUser, postUser } = require("../Controllers/users");

usersRouter.route("/:userToken").get(getUser);
usersRouter.route("/:userToken").post(postUser);

module.exports = { usersRouter };
