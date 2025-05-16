import express from 'express';
import * as revenueController from '../controller/revenueController';

const router = express.Router();

// Lấy tất cả doanh thu
router.get("/", revenueController.getAllRevenueController);

// Lấy doanh thu theo năm
router.get("/year/:year", revenueController.getRevenueByYearController);

// Lấy doanh thu theo tháng (của năm cụ thể)
router.get("/month/:year", revenueController.getRevenueByMonthController);

// Lấy doanh thu theo tuần (của năm cụ thể)
router.get("/week/:year", revenueController.getRevenueByWeekController);


export default router;