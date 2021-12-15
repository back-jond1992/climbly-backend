const db = require("../db/db");
const { mountainCollection } = require("../database-variable");

fetchAllMountains = (sortBy = "hillname", orderBy = "ASC", lastVisibleHill = null, search) => {
  const { name, lowestHeight, highestHeight, country } = search;
  const collection = db.collection(`${mountainCollection}`);

  if (sortBy !== "hillname" && sortBy !== "feet" && sortBy !== "metres") {
    return Promise.reject({ status: 400, msg: "Bad query" });
  }
  if (orderBy !== "ASC" && orderBy !== "DESC") {
    return Promise.reject({ status: 400, msg: "Bad query" });
  }

  if (Object.keys(search).length > 0) {
    let query;

    if (name) {
      query = collection.where("hillname", "==", name);
    }
    if (lowestHeight && highestHeight) {
      query = collection.where("feet", ">", lowestHeight).where("feet", "<", highestHeight);
    }
    if (country) {
      query = collection.where("country", "==", country);
    }
    return query.get().then((res) => {
      if (!res.docs[0]) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      const mountains = [];
      res.docs.map((mountain) => {
        mountains.push(mountain.data());
      });
      return mountains;
    });
  }
  if (lastVisibleHill === null) {
    return collection
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
    return collection
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
