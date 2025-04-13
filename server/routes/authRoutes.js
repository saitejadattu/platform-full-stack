const express = require("express");
const authQueries = require("../controllers/authController.js");
const Router = express.Router();
const authorization = require("../authorization");
Router.post("/register", authQueries.register);
Router.put("/update/:id",authorization, authQueries.update);
Router.delete("/delete/:id",authorization, authQueries.delete);
Router.post("/login", authQueries.login);
module.exports = Router;
