const express = require("express");
const authorization = require("../authorization");
const authQueries = require("../controllers/authController");
const sellerQueries = require("../controllers/sellerController");
const adminQueries = require("../controllers/adminController");
const Router = express.Router();

Router.post("/create-U-S-A", authorization, authQueries.register);
Router.get("/all-stores", authorization, sellerQueries.getAllStores);
Router.get("/all-users", authorization, adminQueries.getAllUsers);
module.exports = Router;
