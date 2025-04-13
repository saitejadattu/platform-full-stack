const db = require("../dbConnection.js");
const { v4: uuidV4 } = require("uuid");
const sellerQueries = {
  addStore: (request, response) => {
    try {
      const { id } = request.params;
      const addStore = `
            INSERT INTO stores(id, name, email, address, owner_id)
            VALUES (?,?,?,?,?)
          `;
      const { name, email, address } = request.body;
      const values = [uuidV4(), name, email, address, id];
      db.query(addStore, values, (err, result) => {
        if (err) {
          response.status(500).send({ message: err.message });
        } else {
          response.status(201).json({ result });
        }
      });
    } catch (err) {
      response.status(500).send({ message: err.message });
    }
  },
  getAllStores: (request, response) => {
    try {
      const getStores = `SELECT * FROM stores;
      `;
      db.query(getStores, (err, result) => {
        if (err) {
          response.status(500).send({ message: err });
        } else {
          response.status(200).json({ result });
        }
      });
    } catch (err) {
      response.status(500).send({ message: err });
    }
  },
  getAllReviews: (request, response) => {
    try {
      const getReviews = `SELECT * FROM reviews;`;
      db.query(getReviews, (err, result) => {
        if (err) {
          response.status(500).json({ message: err });
        } else {
          response.status(200).json({ result });
        }
      });
    } catch (err) {
      response.status(500).json({ message: err });
    }
  },
};
module.exports = sellerQueries;
