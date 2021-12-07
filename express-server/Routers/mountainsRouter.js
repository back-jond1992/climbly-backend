const express = require("express");
const mountainsRouter = express.Router();
const {getAllMountains} = require('../Controllers/mountains')

mountainsRouter.route('/').get(getAllMountains)

module.exports = {mountainsRouter}