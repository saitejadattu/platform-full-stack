const db = require("../dbConnection")

const adminQueries = {
  getAllUsers: (request, response) => {
    try {
      const users = `
            SELECT * FROM users;
          `;
      db.query(users, (err, result) => {
        if (err) {
          response.send(err.message);
        } else {
          response.send(result);
        }
      });
    } catch (err) {
      response.send(err.message);
    }
  }
};

module.exports = adminQueries
