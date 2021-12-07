const express = require("express");
const mountainsRouter = express.Router();
const {
  getAllMountains,
  getMountainByHillNumber,
} = require("../Controllers/mountains");
mountainsRouter.route("/").get(getAllMountains);
mountainsRouter.route("/:hillnumber").get(getMountainByHillNumber);
module.exports = { mountainsRouter };
