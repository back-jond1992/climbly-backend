const { fetchUser, addUser, updateUser } = require("../Models/users");

const getUser = (req, res, next) => {
  const userToken = req.params;
  fetchUser(userToken)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};

const postUser = (req, res, next) => {
  const user = req.params;
  addUser(user, req.body.name, req.body.img_url)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  const body = req.body;
  const user = req.params;

  updateUser(body, user)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
module.exports = { getUser, postUser, patchUser };
