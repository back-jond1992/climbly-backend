const db = require("../db/db");
const { mountainCollection } = require("../database-variable");

fetchMountains = (search) => {
  console.log(search);
  const { name, lowestHight, highestHight } = search;
  console.log(name);
  console.log(lowestHight);
  console.log(highestHight);

  const collection = db.collection(`${mountainCollection}`);

  if (name !== "") {
    return collection
      .where("hillname", ">=", name)

      .get()
      .then((res) => {
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
  if (name === "") {
    return collection
      .where("feet", ">", lowestHight)
      .where("feet", "<", highestHight)
      .get()
      .then((res) => {
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
};

module.exports = { fetchMountains };
