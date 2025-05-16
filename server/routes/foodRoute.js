import express from "express";
import * as foodController from "../controller/foodController";
import upload from "../services/upload";

const router = express.Router();

// Route tạo món ăn
router.post("/", upload.single("image"), foodController.createFoodController);

// Route lấy tất cả món ăn
router.get("/", foodController.getAllFoodController);

// Route lấy món ăn theo ID
router.get("/:id", foodController.getFoodByIdController);

// Route cập nhật món ăn
router.put("/:id", upload.single("image"), foodController.updateFoodController);

// Route xóa món ăn
router.delete("/:id",upload.single("image"),foodController.deleteFoodController
);

export default router;
