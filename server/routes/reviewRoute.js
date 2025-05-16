import express from "express";
import * as reviewController from "../controller/reviewController";


const router = express.Router();

//create review
router.post("/", reviewController.createReviewController);

// get all
router.get("/", reviewController.getAlReviewController);

// get theo id đơn
router.get("/order/:id", reviewController.getReviewByOrderController);

//get theo món
router.get("/food/:id", reviewController.getReviewByFoodController);

export default router;
