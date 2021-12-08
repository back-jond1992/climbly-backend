const express = require("express");
const usersRouter = express.Router();
const { getUser, postUser, patchUser } = require("../Controllers/users");

usersRouter.route("/:userToken").get(getUser).post(postUser).patch(patchUser)

module.exports = { usersRouter };
