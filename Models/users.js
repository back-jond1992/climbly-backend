const db = require("../db/db");
const { userCollection } = require("../database-variable");

const fetchUser = (user) => {
  const { userToken } = user;
  return db
    .collection(`${userCollection}`)
    .where("userToken", "==", userToken)
    .get()
    .then((res) => {
      if (!res.docs[0]) {
        return Promise.reject({ status: 404, msg: "Entry not found" });
      } else {
        return res.docs[0].data();
      }
    });
};

const addUser = (user, name, img_url) => {
  const { userToken } = user;
  return db
    .collection(`${userCollection}`)
    .doc(`${userToken}`)
    .set({
      userToken: userToken,
      totalFeetClimbed: 0,
      noOfHillsClimbed: 0,
      hillsClimbed: [],
      name: name,
      img_url: img_url,
    })
    .then(() => {
      return db
        .collection(`${userCollection}`)
        .where("userToken", "==", userToken)
        .get()
        .then((res) => {
          return res.docs[0].data();
        });
    });
};

const updateUser = (body, user) => {
  const { userToken } = user;
  if (body.userToken !== user.userToken) {
    return Promise.reject({ status: 400, msg: "User token does not match" });
  }
  return db
    .collection(`${userCollection}`)
    .where("userToken", "==", userToken)
    .get()
    .then((res) => {
      if (!res.docs[0]) {
        return Promise.reject({ status: 404, msg: "Entry not found" });
      } else {
        return db
          .collection(`${userCollection}`)
          .doc(`${userToken}`)
          .set(body)
          .then(() => {
            return db
              .collection(`${userCollection}`)
              .where("userToken", "==", userToken)
              .get()
              .then((res) => {
                return res.docs[0].data();
              });
          });
      }
    });
};

module.exports = { fetchUser, addUser, updateUser };
