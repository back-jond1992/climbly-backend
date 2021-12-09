const { fetchAllMountains, fetchMountainsByHillNumber } = require("../Models/mountains");

const getAllMountains = async (req, res, next) => {
  sortBy = req.query.sortBy;
  orderBy = req.query.orderBy;
  lastHill = req.query.lastHill;

  fetchAllMountains(sortBy, orderBy, lastHill)
    .then((mountains) => {
      res.status(200).send({ mountains });
    })
    .catch(next);
};

const getMountainByHillNumber = async (req, res, next) => {
  const hillNumber = req.params;
  fetchMountainsByHillNumber(hillNumber)
    .then((mountain) => {
      res.status(200).send({ mountain });
    })
    .catch(next);
};

module.exports = { getAllMountains, getMountainByHillNumber };
