const {
  fetchAllMountains,
  fetchMountainsByHillNumber,
} = require("../Models/mountains");

const getAllMountains = async (req, res, next) => {
  sortBy = req.query.sortBy;
  orderBy = req.query.orderBy;
  lastVisibleHill = req.query.lastVisibleHill;
  fetchAllMountains(sortBy, orderBy, lastVisibleHill)
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
