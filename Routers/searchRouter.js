const express = require("express");
const searchRouter = express.Router();
const { searchAllMountains } = require("../Controllers/search");

searchRouter.route("/").get(searchAllMountains);

module.exports = { searchRouter };
