const express = require("express");
const Router = express.Router();
const sellerQueries = require("../controllers/sellerController.js");
const authorization = require("../authorization");
Router.post("/create-store/:id", authorization, sellerQueries.addStore);
Router.get("/all-stores", sellerQueries.getAllStores);
Router.get("/allReviews", sellerQueries.getAllReviews);
module.exports = Router;
