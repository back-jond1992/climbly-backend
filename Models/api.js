const fs = require("fs");

fetchAPI = (callback) => {
  console.log("arrived");
  return fs.readFile("endpoints.json", "utf-8", (err, endpoints) => {
    if (err) {
      next(err);
    } else {
      const parsedEndpoints = JSON.parse(endpoints);
      callback(null, parsedEndpoints);
    }
  });
};

module.exports = { fetchAPI };
