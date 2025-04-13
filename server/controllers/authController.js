const express = require("express");
const { v4: uuidV4 } = require("uuid");
const bcrypt = require("bcryptjs");
const db = require("../dbConnection.js");
const jwt = require("jsonwebtoken");
const authQueries = {
  register: (request, response) => {
    try {
      const isUser = `
            SELECT * FROM users WHERE email = '${request.body.email}';
          `;
      db.query(isUser, async (err, result) => {
        if (err) {
          console.log(err.message);
        } else {
          if (!result) {
            console.log("user");
          } else {
            const { name, email, address, password, role } = request.body;
            const hashedPass = await bcrypt.hash(password, 10);
            const addUser = `
                  INSERT INTO users(id ,name, email, address, password, role) VALUES (?,?,?,?,?,?);
                `;
            db.query(
              addUser,
              [uuidV4(), name, email, address, hashedPass, role],
              (err, result) => {
                if (err) {
                  if (err.errno === 1062) {
                    response
                      .status(500)
                      .json({ message: `Email "${email}" is already in use` });
                  } else {
                    response.status(500).json({ message: err });
                  }
                } else {
                  response
                    .status(201)
                    .json({ message: "registration successful" });
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
  update: (request, response) => {
    const { id } = request.params;
    const isUser = `
      SELECT * FROM users WHERE id = ?;
    `;
    db.query(isUser, [id], async (err, result) => {
      if (err) {
        response.send(err);
      } else {
        if (
          request.body?.email !== result[0]?.email &&
          request.body?.name !== result[0]?.name &&
          request.body?.address !== result[0]?.address
        ) {
          const { name, email, address, password, role } = result[0];
          if (result.length > 0) {
            const updateQuery = `
            UPDATE users SET name = ?,email = ?,address = ?,password = ?,role = ? WHERE id = "${id}"; 
          `;
            let hashedPass;
            if (request.body.password) {
              hashedPass = await bcrypt.hash(request.body?.password, 10);
            }
            db.query(
              updateQuery,
              [
                request.body.name || name,
                request.body.email || email,
                request.body.address || address,
                hashedPass || password,
                request.body.role || role,
              ],
              (err, result) => {
                if (err) {
                  if (err.errno === 1062) {
                    response
                      .status(500)
                      .json({ message: "email already in use" });
                  } else {
                    response.status(500).json({ message: err });
                  }
                } else {
                  response
                    .status(200)
                    .json({ message: "updated Successfully" });
                }
              }
            );
          } else {
            response.status(500).json({ message: "user not found" });
          }
        } else {
          response.status(400).json({ message: "information can't be same " });
        }
      }
    });
  },
  login: (request, response) => {
    const { email, password } = request.body;
    const isUser = `SELECT * FROM users WHERE email = ?;`;
    db.query(isUser, [email], async (err, result) => {
      if (err) {
        response.status(500).json({ message: err });
      } else {
        if (result.length > 0) {
          const { email, role, id } = result[0];
          const payload = { email, role, id };
          const isValidPass = await bcrypt.compare(
            password,
            result[0].password
          );
          if (isValidPass) {
            let jwtToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
              expiresIn: "1hr",
            });
            response.status(200).json({ jwtToken });
          } else {
            response
              .status(500)
              .json({ message: "please provide valid details!" });
          }
        } else {
          response.status(404).json({ message: "User Not Found!" });
        }
      }
    });
  },
  delete: (request, response) => {
    try {
      const { id } = request.params;
      const deleteQuery = `
            DELETE FROM users WHERE id = "${id}"
        `;
      db.query(deleteQuery, (err, result) => {
        if (err) {
          response.status(500).json({ message: err });
        } else {
          response.status(200).json({ message: "deleted" });
        }
      });
    } catch (err) {
      response.status(500).json({ message: err });
    }
  },
};
module.exports = authQueries;
