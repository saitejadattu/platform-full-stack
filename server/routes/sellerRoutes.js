const express = require("express");
const Router = express.Router();
const sellerQueries = require("../controllers/sellerController.js");
const authQueries = require("../controllers/authController.js");
const authorization  = require("../authorization")
Router.post("/create-store/:id",authorization, sellerQueries.addStore);
Router.get("/all-stores",authorization, sellerQueries.getAllStores);
Router.get("/allReviews",authorization, sellerQueries.getAllReviews);
module.exports = Router;
