const db = require("../db/db");
const { mountainCollection } = require("../database-variable");
const { firestore } = require("firebase-admin");

let lastVisibleHill = null;

fetchAllMountains = (sortBy = "hillname", orderBy = "ASC") => {
  if (sortBy !== "hillname" && sortBy !== "feet" && sortBy !== "metres") {
    return Promise.reject({ status: 400, msg: "Bad query" });
  }
  if (orderBy !== "ASC" && orderBy !== "DESC") {
    return Promise.reject({ status: 400, msg: "Bad query" });
  }

  return db
    .collection(`${mountainCollection}`)
    .orderBy(sortBy, orderBy)
    .limit(10)
    .startAfter(lastVisibleHill || 0)
    .get()
    .then((res) => {
      const mountains = [];
      const last = res.docs[res.docs.length - 1].data().hillname;
      console.log(last);
      lastVisibleHill = last;
      res.docs.map((mountain) => {
        mountains.push(mountain.data());
      });
      return mountains;
    });
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
