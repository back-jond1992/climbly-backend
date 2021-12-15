const { fetchAPI } = require("../Models/api");

getAPI = (req, res, next) => {
  console.log("arrived");
  fetchAPI((err, api) => {
    res.status(200).send({ api });
  });
};

module.exports = { getAPI };
