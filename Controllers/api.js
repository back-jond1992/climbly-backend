const { fetchAPI } = require("../Models/api");

getAPI = (req, res, next) => {
  fetchAPI((api) => {
    res.status(200).send({ api });
  }).catch(next);
};

module.exports = { getAPI };
