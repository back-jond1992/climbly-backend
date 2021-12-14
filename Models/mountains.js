const db = require("../db/db");
const { mountainCollection } = require("../database-variable");

fetchAllMountains = (sortBy = "hillname", orderBy = "ASC", lastVisibleHill = null) => {
  if (sortBy !== "hillname" && sortBy !== "feet" && sortBy !== "metres") {
    return Promise.reject({ status: 400, msg: "Bad query" });
  }
  if (orderBy !== "ASC" && orderBy !== "DESC") {
    return Promise.reject({ status: 400, msg: "Bad query" });
  }
  if (lastVisibleHill === null) {
    return db
      .collection(`${mountainCollection}`)
      .orderBy(sortBy, orderBy)
      .limit(10)
      .get()
      .then((res) => {
        const mountains = [];
        res.docs.map((mountain) => {
          const mountainWithId = mountain.data();
          mountainWithId.id = mountain.id;
          mountains.push(mountainWithId);
        });
        return mountains;
      });
  } else {
    return db
      .collection(`${mountainCollection}`)
      .doc(lastVisibleHill)
      .get()
      .then((res) => {
        return db
          .collection(`${mountainCollection}`)
          .orderBy(sortBy, orderBy)
          .startAfter(res)
          .limit(10)
          .get()
          .then((res) => {
            const mountains = [];
            res.docs.map((mountain) => {
              const mountainWithId = mountain.data();
              mountainWithId.id = mountain.id;
              mountains.push(mountainWithId);
            });
            return mountains;
          });
      });
  }
};

fetchMountainsByHillNumber = (hill) => {
  const { hillnumber } = hill;
  const collection = db.collection(`${mountainCollection}`);
  return collection
    .where("hillnumber", "==", Number(hillnumber))
    .get()
    .then((res) => {
      if (!res.docs[0]) {
        return Promise.reject({ status: 404, msg: "Entry not found" });
      }
      return res.docs[0].data();
    });
};

module.exports = { fetchAllMountains, fetchMountainsByHillNumber };
