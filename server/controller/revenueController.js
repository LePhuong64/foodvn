import * as revenueService from "../services/revenue";

export const getAllRevenueController = async (req, res) => {
  try {
    const response = await revenueService.getAllRevenueService();
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Fail at get all revenue: ${error.message}` });
  }
};
//lấy doanh thu theo năm
export const getRevenueByYearController = async (req, res) => {
  try {
    const { year } = req.params;
    const response = await revenueService.getRevenueByYearService(year);
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Fail at get revenue by year: ${error.message}` });
  }
};
//lấy theo tháng
export const getRevenueByMonthController = async (req, res) => {
  try {
    const { year } = req.params;
    const response = await revenueService.getRevenueByMonthService(year);
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Fail at get revenue by month: ${error.message}` });
  }
};
//lấy theo tuần
export const getRevenueByWeekController = async (req, res) => {
  try {
    const { year } = req.params;
    const response = await revenueService.getRevenueByWeekService(year);
    return res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Fail at get revenue by week: ${error.message}` });
  }
};
