import db from "../models";

// Create category
export const createCategoryService = ({ name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const [category, created] = await db.Category.findOrCreate({
        where: { categoryName: name },
        defaults: { categoryName: name },
      });

      if (created) {
        resolve({
          err: 0,
          msg: "Thêm loại món ăn thành công!",
          data: category,
        });
      } else {
        resolve({
          err: 1,
          msg: "Loại món ăn đã tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
// Get all categoryy
export const getAllCategoryService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({});
      resolve({
        err: 0,
        msg: "Lấy danh sách loại thành công!",
        data: response,
        count: response.length
      });
    } catch (error) {
      reject(error);
    }
  });
// Get one category
export const getOneCategoryService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findOne({
        where: { id },
        attributes: ["id", "categoryName"],
      });
      if (response) {
        resolve({
          err: 0,
          msg: "Lấy thông tin loại thành công!",
          data: response,
        });
      } else {
        resolve({
          err: 1,
          msg: "Loại không tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
// Update category
export const updateCategoryService = (id, { name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findOne({
        where: { id },
      });
      if (!response) {
        resolve({
          err: 1,
          msg: "Loại không tồn tại!",
        });
      } else {
        const updatedData = {
          ...(name && { categoryName: name }),
        };

        await db.Category.update(updatedData, {
          where: { id },
        });

        resolve({
          err: 0,
          msg: "Cập nhật loại thành công!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
// Delete category
export const deleteCategoryService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.destroy({ where: { id } });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Xóa loại thành công!"
          : "Dữ liệu không tồn tại!",
      });
    } catch (error) {
      reject(error);
    }
  });
