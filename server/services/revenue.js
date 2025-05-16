import db from "../models";

// Lấy tất cả doanh thu (không lọc theo năm, tháng, tuần)
export const getAllRevenueService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const revenues = await db.Revenue.findAll();
      resolve({
        err: 0,
        msg: "Lấy tất cả doanh thu thành công!",
        data: revenues,
      });
    } catch (error) {
      reject(error);
    }
  });

// Lấy doanh thu theo năm
export const getRevenueByYearService = (year) =>
  new Promise(async (resolve, reject) => {
    try {
      const revenues = await db.Revenue.findAll({
        attributes: [
          "year",
          [db.sequelize.fn("SUM", db.sequelize.col("total")), "totalRevenue"],
        ],
        where: { year: year },
        group: ["year"],
      });

      resolve({
        err: 0,
        msg: `Lấy doanh thu của năm ${year} thành công!`,
        data: revenues,
      });
    } catch (error) {
      reject(error);
    }
  });

//Lấy doanh thu theo tháng trong một năm
export const getRevenueByMonthService = (year) =>
  new Promise(async (resolve, reject) => {
    try {
      const revenues = await db.Revenue.findAll({
        attributes: [
          "month",
          "year",
          [db.sequelize.fn("SUM", db.sequelize.col("total")), "totalRevenue"],
        ],
        where: { year: year },
        group: ["month", "year"],
        order: [["month", "ASC"]],
      });

      resolve({
        err: 0,
        msg: `Lấy doanh thu theo tháng trong năm ${year} thành công!`,
        data: revenues,
      });
    } catch (error) {
      reject(error);
    }
  });

// Lấy doanh thu theo tuần trong một năm
export const getRevenueByWeekService = (year) =>
  new Promise(async (resolve, reject) => {
    try {
      const revenues = await db.Revenue.findAll({
        attributes: [
          "week",
          "year",
          [db.sequelize.fn("SUM", db.sequelize.col("total")), "totalRevenue"],
        ],
        where: { year: year },
        group: ["week", "year"],
        order: [["week", "ASC"]],
      });

      resolve({
        err: 0,
        msg: `Lấy doanh thu theo tuần trong năm ${year} thành công!`,
        data: revenues,
      });
    } catch (error) {
      reject(error);
    }
  });
