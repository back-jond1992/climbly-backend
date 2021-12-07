const express = require("express");
const mountainsRouter = express.Router();
const {getAllMountains} = require('../Controller/mountains')

mountainsRouter.route('/').get(getAllMountains)

module.exports = {mountainsRouter}