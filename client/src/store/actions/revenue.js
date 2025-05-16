import { apiGetAllRevenue, apiGetMonthRevenue, apiGetWeekRevenue, apiGetYearRevenue } from "../../services/revenue";
import actionTypes from "./actionTypes";

//get all
export const getAllRevenue = () => async (dispatch) => {
  try {
    const response = await apiGetAllRevenue(); 
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_REVENUE,
        data: response.data.data,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_REVENUE,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy doanh thu",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_REVENUE,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy doanh thu",
    });
  }
};
//get by year
export const getYearRevenue = (year) => async (dispatch) => {
  try {
    const response = await apiGetYearRevenue(year);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_REVENUE_BY_YEAR,
        data: response.data.data,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_REVENUE_BY_YEAR,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy doanh thu theo năm",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_REVENUE_BY_YEAR,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy doanh thu theo năm",
    });
  }
};
//get by month
export const getMonthRevenue = (year) => async (dispatch) => {
    try {
      const response = await apiGetMonthRevenue(year);
      if (response?.data?.err === 0) {
        dispatch({
          type: actionTypes.GET_REVENUE_BY_MONTH,
          data: response.data.data,
          msg: response.data.msg || "",
        });
      } else {
        dispatch({
          type: actionTypes.GET_REVENUE_BY_MONTH,
          data: [],
          msg: response.data.msg || "Lỗi khi lấy doanh thu theo tháng",
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_REVENUE_BY_MONTH,
        data: [],
        msg: "Có lỗi xảy ra khi lấy doanh thu theo tháng",
      });
    }
  };
//get by week
export const getWeekRevenue = (year) => async (dispatch) => {
    try {
      const response = await apiGetWeekRevenue(year);
      if (response?.data?.err === 0) {
        dispatch({
          type: actionTypes.GET_REVENUE_BY_WEEK,
          data: response.data.data,
          msg: response.data.msg || "",
        });
      } else {
        dispatch({
          type: actionTypes.GET_REVENUE_BY_WEEK,
          data: [],
          msg: response.data.msg || "Lỗi khi lấy doanh thu theo tuần",
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_REVENUE_BY_WEEK,
        data: [],
        msg: "Có lỗi xảy ra khi lấy doanh thu theo tuần",
      });
    }
  };