const { fetchMountains } = require("../Models/search");

const searchAllMountains = async (req, res, next) => {
  const search = req.body;
  fetchMountains(search)
    .then((mountains) => {
      res.status(200).send({ mountains });
    })
    .catch(next);
};

module.exports = { searchAllMountains };
