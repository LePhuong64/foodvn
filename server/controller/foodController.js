import * as foodService from "../services/foods";
import GetPublicId from "./getPublicID";
const cloudinary = require("../config/cloudinary.config.js");

// Tạo món ăn
export const createFoodController = async (req, res) => {
  const { name, price, categoryName, description } = req.body;
  const foodImg = req.file ? req.file.path : null;
  try {
    if (!name || !price || !categoryName || !description || !foodImg) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
    }
    const response = await foodService.createFoodService({
      name,
      price,
      categoryName,
      description,
      foodImg,
    });
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at create food:"]: error.message });
  }
};
// Lấy tất cả món ăn
export const getAllFoodController = async (req, res) => {
  try {
    const result = await foodService.getAllFoodService();
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ ["Fail at get all food:"]: error.message });
  }
};
// Lấy món ăn theo ID
export const getFoodByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await foodService.getFoodByIdService(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get one food:"]: error.message });
  }
};
// Cập nhật món ăn
export const updateFoodController = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await foodService.getFoodByIdService(id);
    if (!food) {
      return res.status(404).json({ message: "Món ăn không tồn tại!" });
    }
    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      categoryName: req.body.categoryName,
    };
    if (req.file) {
      const oldImage = food.data.foodImg;
      if (oldImage) {
        const publicId = GetPublicId(oldImage);
        try {
          const result = await cloudinary.uploader.destroy(publicId);

          if (result.result !== "ok") {
            return res
              .status(500)
              .json({ message: "Lỗi khi xóa ảnh cũ trên Cloudinary!" });
          }
        } catch (error) {
          return res
            .status(500)
            .json({ message: "Lỗi khi kết nối Cloudinary để xóa ảnh cũ!" });
        }
      }
      updatedData.image = req.file.path;
    }
    const result = await foodService.updateFoodService(id, updatedData);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ ["Fail at update food:"]: error.message });
  }
};
// Xóa món ăn
export const deleteFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodService.getFoodByIdService(id);
    if (!food) {
      return res.status(404).json({ message: "Món ăn không tồn tại!" });
    }
    //xóa ảnh trên cloud
    if (food.data.foodImg) {
      const publicId = GetPublicId(food.data.foodImg);
      try {
        const result = await cloudinary.uploader.destroy(publicId);
        if (result.result !== "ok") {
          return res
            .status(500)
            .json({ message: "Lỗi khi xóa ảnh trên Cloudinary!" });
        }
      } catch (error) {
        console.error("Cloudinary error:", cloudError);
        return res.status(500).json({ message: "Lỗi khi kết nối Cloudinary!" });
      }
    }
    //xóa món ăn
    const result = await foodService.deleteFoodService(id);
    res.status(200).json({ message: "Món ăn đã được xóa!", result });
  } catch (error) {
    res.status(500).json({ ["Fail at delete food:"]: error.message });
  }
};
