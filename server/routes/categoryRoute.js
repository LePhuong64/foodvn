import express from "express";
import * as categoryController from "../controller/categoryController"; 

const router = express.Router();

// create category
router.post("/", categoryController.createCategory);

// get category
router.get("/", categoryController.getAllCategory);
// Rget category by id
router.get("/:id", categoryController.getOneCategory);
// update category
router.put("/:id", categoryController.updateCategory);
// delete category
router.delete("/:id", categoryController.deleteCategory);

export default router;
