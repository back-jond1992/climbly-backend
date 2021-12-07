const db = require("../db/db");

fetchAllMountains = (sortBy = "hillname", orderBy = "DESC") => {
  return db
    .collection("mountains")
    .orderBy(sortBy, orderBy)
    .get()
    .then((res) => {
      const mountains = [];
      res.docs.map((mountain) => {
        mountains.push(mountain.data());
      });
      return mountains;
    });
};

fetchMountainsByHillNumber = (hill) => {
  const { hillnumber } = hill;
  const collection = db.collection("mountains");
  return collection
    .where("hillnumber", "==", Number(hillnumber))
    .get()
    .then((res) => {
      return res.docs[0].data();
    });
};

module.exports = { fetchAllMountains, fetchMountainsByHillNumber };
