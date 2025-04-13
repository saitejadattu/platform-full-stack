const express = require("express");
const Router = express.Router();
const authorization = require("../authorization")
const userQueries = require("../controllers/userController.js");
const sellerQueries = require("../controllers/sellerController.js");
Router.post("/review/:userId/:storeId",authorization, userQueries.addReviewOrUpdateReview);
Router.get("/allReviews", authorization, sellerQueries.getAllReviews);
module.exports = Router;
