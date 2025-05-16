import db from "../models";

//create review
export const createReviewService = ({ reviews }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!Array.isArray(reviews) || reviews.length === 0) {
        return resolve({
          err: 1,
          msg: "Dữ liệu không hợp lệ!",
        });
      }

      let validReviews = [];
      let errors = [];

      for (const review of reviews) {
        const { customerID, foodID, rating, comment, orderID } = review;

        // Kiểm tra xem đơn hàng này đã được đánh giá chưa
        const existingReview = await db.Review.findOne({
          where: { orderID: orderID, customerID: customerID },
        });

        if (existingReview) {
          errors.push({
            orderID,
            msg: `Đơn hàng có này đã được đánh giá rồi, không thể đánh giá thêm!`,
          });
          continue;
        }

        // Kiểm tra xem khách hàng đã từng gọi món này chưa
        const orderDetail = await db.OrderDetail.findOne({
          include: [
            {
              model: db.Order,
              as: "order",
              where: { customerID: customerID },
            },
          ],
          where: { foodID: foodID, orderID: orderID },
        });

        if (!orderDetail) {
          errors.push({
            foodID,
            msg: `Bạn chưa từng dùng món có ID ${foodID}, không thể đánh giá!`,
          });
        } else {
          validReviews.push({ customerID, foodID, rating, comment, orderID });
        }
      }

      // Nếu có ít nhất một đánh giá hợp lệ, lưu vào database
      if (validReviews.length > 0) {
        await db.Review.bulkCreate(validReviews);
      }

      resolve({
        err: errors.length > 0 ? 1 : 0,
        msg:
          errors.length > 0
            ? "Một số đánh giá không hợp lệ!"
            : "Đánh giá món ăn thành công!",
        errors,
        data: validReviews,
      });
    } catch (error) {
      reject(error);
    }
  });

//get theo id đơn hàng
export const getReviewsByOrderIDService = (orderID) =>
  new Promise(async (resolve, reject) => {
    try {
      const reviews = await db.Review.findAll({
        where: { orderID },
        include: [
          {
            model: db.Food,
            as: "food",
            attributes: ["name", "price", "foodImg"],
          },
          {
            model: db.Customer,
            as: "customer",
            attributes: ["customerName"],
          },
        ],
      });

      if (reviews.length === 0) {
        return resolve({
          err: 1,
          msg: "Đơn chưa được đánh giá!",
          data: [],
        });
      }

      resolve({
        err: 0,
        msg: "Lấy đánh giá thành công!",
        data: reviews,
      });
    } catch (error) {
      reject(error);
    }
  });

//get all
export const getAllReviewsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const reviews = await db.Review.findAll({
        include: [
          {
            model: db.Customer,
            as: "customer",
            attributes: ["customerName"],
          },
          {
            model: db.Food,
            as: "food",
            attributes: ["name", "price", "foodImg"],
          },
        ],
      });

      resolve({
        err: 0,
        msg: "Lấy tất cả đánh giá thành công!",
        data: reviews,
        count: reviews.length,
      });
    } catch (error) {
      reject(error);
    }
  });

//get theo id theo món
export const getReviewsByFoodService = (foodID) =>
  new Promise(async (resolve, reject) => {
    try {
      const reviews = await db.Review.findAll({
        where: { foodID },
        include: [
          {
            model: db.Food,
            as: "food",
            attributes: ["name", "price", "foodImg"],
          },
          {
            model: db.Customer,
            as: "customer",
            attributes: ["customerName"],
          },
        ],
      });

      if (reviews.length === 0) {
        return resolve({
          err: 1,
          msg: "Món ăn chưa có đánh giá!",
          data: [],
          averageRating: 0, 
        });
      }

      // Tính tổng số sao và số lượng đánh giá
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = totalRating / reviews.length;

      resolve({
        err: 0,
        msg: "Lấy đánh giá thành công!",
        data: reviews,
        averageRating: parseFloat(averageRating.toFixed(1)), 
      });
    } catch (error) {
      reject(error);
    }
  });
