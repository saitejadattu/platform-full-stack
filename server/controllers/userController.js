const db = require("../dbConnection");
const { v4: uuidV4 } = require("uuid");
const userQueries = {
  addReviewOrUpdateReview: (request, response) => {
    try {
      const { userId, storeId } = request.params;
      const isReviewExisting = `SELECT * FROM reviews WHERE user_id = ? AND store_id = ?;`;
      db.query(isReviewExisting, [userId, storeId], (err, result) => {
        if (err) {
          response.status(500).json({ message: err });
        } else {
          if (isReviewExisting.length > 0) {
            const addReview = `
            INSERT INTO reviews(id, user_id, store_id, rating)
            VALUES (?,?,?,?);
          `;
            db.query(
              addReview,
              [uuidV4(), userId, storeId, request.body.rating],
              (err, result) => {
                if (err) {
                  response.status(500).json({ message: err });
                } else {
                  response.status(200).json({ message: "review added" });
                }
              }
            );
          } else {
            const updateQuery = `UPDATE reviews SET rating = ?, updated_at = CURRENT_TIMESTAMP WHERE user_id = ? AND store_id = ?;`;
            db.query(
              updateQuery,
              [request.body.rating, userId, storeId],
              (err, result) => {
                if (err) {
                  response.status(500).json({ message: err });
                } else {
                    console.log(result)
                  response.status(201).json({ message: "review updated" });
                }
              }
            );
          }
        }
      });
    } catch (err) {
      response.status(500).json({ message: err });
    }
  },
};
module.exports = userQueries;
