import db from "../models";

// Create cart service
export const createCartService = (customerID, foodID, quantity) =>
  new Promise(async (resolve, reject) => {
    try {
      const customer = await db.Customer.findOne({
        where: { id: customerID }
      });

      if (!customer) {
        return reject({
          err: 1,
          msg: "Khách hàng chưa đăng nhập!",
        });
      }

      let cart;

      // Kiểm tra xem món ăn đã có trong giỏ hàng chưa
      const existingItem = await db.Cart.findOne({
        where: { customerID, foodID },
      });

      if (existingItem) {
        existingItem.quantity += quantity;
        await existingItem.save();
        cart = existingItem;
      } else {
        cart = await db.Cart.create({
          customerID,
          foodID,
          quantity,
        });
      }

      return resolve({
        err: 0,
        msg: "Thêm vào giỏ hàng thành công!",
        data: cart,
      });
    } catch (error) {
      console.log("Error:", error);
      return reject({
        err: 1,
        msg: "Có lỗi xảy ra!",
        error: error.message,
      });
    }
  });
//get cart
export const getCartService = (customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Cart.findAll({
        where: { customerID },
        include: [
          {
            model: db.Food,
            as: "food",
            attributes: ["name", "price", "foodImg"],
          },
        ],
      });

      const totalQuantity = response.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      return resolve({
        err: 0,
        msg: "Lấy giỏ hàng thành công!",
        data: response,
        count: totalQuantity, // Tổng số lượng món trong giỏ hàng
      });
    } catch (error) {
      return reject({
        err: 1,
        msg: "Có lỗi xảy ra!",
        error: error.message,
      });
    }
  });

//update cart
export const updateCartService = (customerID, foodID, quantity) =>
  new Promise(async (resolve, reject) => {
    try {
      const cart = await db.Cart.findOne({
        where: { customerID, foodID },
      });

      if (!cart) {
        return resolve({
          err: 1,
          msg: "Món ăn không tồn tại trong giỏ hàng!",
        });
      }

      cart.quantity = quantity;
      await cart.save();

      // Lấy lại giỏ hàng để tính tổng số lượng món ăn
      const updatedCart = await db.Cart.findAll({ where: { customerID } });

      const totalQuantity = updatedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      return resolve({
        err: 0,
        msg: "Cập nhật giỏ hàng thành công!",
        data: cart,
        count: totalQuantity,
      });
    } catch (error) {
      return reject({
        err: 1,
        msg: "Có lỗi xảy ra!",
        error: error.message,
      });
    }
  });

//delete 1 món
export const deleteCartService = (customerID, foodID) =>
  new Promise(async (resolve, reject) => {
    try {
      const cart = await db.Cart.findOne({
        where: { customerID, foodID },
      });

      if (!cart) {
        return resolve({
          err: 1,
          msg: "Món ăn không tồn tại trong giỏ hàng!",
        });
      }

      await cart.destroy();

      // Lấy lại giỏ hàng để cập nhật tổng số lượng món ăn
      const updatedCart = await db.Cart.findAll({ where: { customerID } });

      const totalQuantity = updatedCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      return resolve({
        err: 0,
        msg: "Xóa món ăn khỏi giỏ hàng thành công!",
        count: totalQuantity, // Tổng số lượng món trong giỏ hàng
      });
    } catch (error) {
      return reject({
        err: 1,
        msg: "Có lỗi xảy ra!",
        error: error.message,
      });
    }
  });

//delete all cart
export const deleteAllCartService = (customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.Cart.destroy({
        where: { customerID },
      });

      return resolve({
        err: 0,
        msg: "Xóa tất cả món ăn khỏi giỏ hàng thành công!",
      });
    } catch (error) {
      return reject({
        err: 1,
        msg: "Có lỗi xảy ra!",
        error: error.message,
      });
    }
  });
