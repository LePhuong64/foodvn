import * as categoryServices from "../services/category.js";

// Tạo danh mục
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(400).json({ message: "Vui lòng nhập đủ thông tin!" });
    }
    const response = await categoryServices.createCategoryService(req.body);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at create category:"]: error.message });
  }
};
// Lấy tất cả danh mục
export const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryServices.getAllCategoryService();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ ["Fail at get category:"]: error.message });
  }
};
// Lấy một danh mục theo ID
export const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await categoryServices.getOneCategoryService(id);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get all category:"]: error.message });
  }
};
// Cập nhật danh mục
export const updateCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await categoryServices.updateCategoryService(id, req.body);
    res.status(200).json({ message: "Danh mục đã được cập nhật!", result });
  } catch (error) {
    res.status(500).json({ ["Fail at update category:"]: error.message });
  }
};
// Xóa danh mục
export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await categoryServices.deleteCategoryService(id);
    res.status(200).json({ message: "Danh mục đã được xóa!", result });
  } catch (error) {
    res.status(500).json({ ["Fail at delete category:"]: error.message });
  }
};
