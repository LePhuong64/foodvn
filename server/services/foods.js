import db from "../models";
// create food
export const createFoodService = ({ name, categoryName, price, description,foodImg }) =>
  new Promise(async (resolve, reject) => {
    try {
      const category = await db.Category.findOne({
        where: { categoryName: categoryName },
      });
      if (!category) {
        return resolve({
          err: 1,
          msg: "Loại món ăn không tồn tại!",
        });
      }
      const [food, created] = await db.Food.findOrCreate({
        where: { name: name },
        defaults: {
          name: name,
          categoryID: category.id,
          price: price,
          description: description,
          foodImg: foodImg,
        },
      });

      if (created) {
        resolve({
          err: 0,
          msg: "Thêm món ăn thành công!",
          data: food,
        });
      } else {
        resolve({
          err: 1,
          msg: "Món ăn đã tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
//Get all food
export const getAllFoodService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Food.findAll({
        include: [
          {
            model: db.Category,
            as: "category", 
            attributes: ["categoryName"],
          },
        ],
        order: [["id", "ASC"]],
      });
      resolve({
        err: 0,
        msg: "Lấy danh sách món ăn thành công!",
        data: response,
        count: response.length
      });
    } catch (error) {
      reject(error);
    }
  });
// Lấy một món ăn theo ID
export const getFoodByIdService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const food = await db.Food.findByPk(id, {
        include: [
          {
            model: db.Category,
            as: "category", 
            attributes: ["categoryName"],
          },
        ],
      });
      if (food) {
        resolve({
          err: 0,
          msg: "Lấy thông tin chi tiết món ăn thành công!",
          data: food,
        });
      } else {
        resolve({
          err: 1,
          msg: "Món ăn không tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
// Update food
export const updateFoodService = (id, { name, categoryName, price, description,image }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Tìm món ăn theo ID
      const food = await db.Food.findOne({ where: { id } });
      if (!food) {
        return resolve({
          err: 1,
          msg: "Món ăn không tồn tại!",
        });
      }

      let categoryID;
      if (categoryName) {
        const category = await db.Category.findOne({ where: { categoryName } });
        if (!category) {
          return resolve({
            err: 1,
            msg: "Loại không tồn tại!",
          });
        }
        categoryID = category.id;
      }
      // Tạo dữ liệu cập nhật
      const updatedData = {
        ...(name && { name }),
        ...(categoryID !== undefined && { categoryID }),
        ...(price && { price }),
        ...(description && { description }),
        ...(image && { foodImg: image }), 
      };
      // Cập nhật thông tin món ăn
      await food.update(updatedData);

      resolve({
        err: 0,
        msg: "Cập nhật món ăn thành công!",
      });
    } catch (error) {
      reject(error);
    }
  });
// Delete food
export const deleteFoodService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Food.destroy({ where: { id } });
      resolve({
        err: response ? 0 : 1,
        msg: response
          ? "Xóa món ăn thành công!"
          : "Dữ liệu không tồn tại!",
      });
    } catch (error) {
      reject(error);
    }
  });