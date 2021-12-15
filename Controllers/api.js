const data = require("../endpoints.json");

getAPI = (req, res, next) => {
  res.status(200).send(data);
};

module.exports = { getAPI };
