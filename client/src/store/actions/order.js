import { apiCreateOrder, apiGetAllOrder, apiGetOrder, apiUpdateOrder, apiUpdateStatusOrder } from "../../services/order";
import actionTypes from "./actionTypes";

//create order
export const createOrder = (payload) => async (dispatch) => {
    try {
      const response = await apiCreateOrder(payload);
      if (response.data.err === 0) {
        dispatch({
          type: actionTypes.CREATE_ORDER_SUCCESS,
          data: response.data.data,
        });
        return Promise.resolve(response.data);
      } else {
        dispatch({
          type: actionTypes.CREATE_ORDER_FAIL,
          data: response.msg,
        });
        return Promise.reject(new Error(response.data.msg));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.CREATE_ORDER_FAIL,
        data: "Có lỗi xảy ra khi tạo order",
      });
      return Promise.reject(new Error("Có lỗi xảy ra khi tạo order"));
    }
  };
//get order
export const getOrder = (id) => async (dispatch) => {
  try {
    const response = await apiGetOrder(id);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ORDER,
        data: response.data.data,
        msg: response.data.msg || "",
        count: response.data.count
      });
    } else {
      dispatch({
        type: actionTypes.GET_ORDER,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách order",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ORDER,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách order",
    });
  }
};
//update order
export const updateOrder = (customerID,orderID) => async (dispatch) => {
  try {
    const response = await apiUpdateOrder(customerID,orderID);
    console.log("API action",response);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.UPDATE_ORDER_SUCCESS,
        data: response.data.data,
        msg: response.data.msg || "Cập nhật đơn hàng thành công!",
      });
      dispatch(getOrder(customerID));
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.UPDATE_ORDER_FAIL,
        msg: response.data.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_ORDER_FAIL,
      msg: "Cập nhật thất bại, vui lòng thử lại sau!",
    });

    return Promise.reject(
      new Error("Cập nhật thất bại, vui lòng thử lại sau!")
    );
  }
};
//update order status
export const updateOrderStatus = (payload) => async (dispatch) => {
  try {
    const response = await apiUpdateStatusOrder(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.UPDATE_STATUS_ORDER_SUCCESS,
        data: response.data.data,
        msg: response.data.msg || "Cập nhật đơn hàng thành công!",
      });
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.UPDATE_STATUS_ORDER_FAIL,
        msg: response.data.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_STATUS_ORDER_FAIL,
      msg: "Cập nhật thất bại, vui lòng thử lại sau!",
    });

    return Promise.reject(
      new Error("Cập nhật thất bại, vui lòng thử lại sau!")
    );
  }
};
//get all order
export const getAllOrder = () => async (dispatch) => {
  try {
    const response = await apiGetAllOrder();
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_ORDER,
        data: response.data.data,
        msg: response.data.msg || "",
        count: response.data.count,
        totalRevenue: response.data.totalRevenue,
        monthlyRevenue : response.data.monthlyRevenue,
        yearlyRevenue : response.data.yearlyRevenue,
        weeklyRevenue : response.data.weeklyRevenue,
      });

    } else {
      dispatch({
        type: actionTypes.GET_ALL_ORDER,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách order",
        totalRevenue: 0,
        monthlyRevenue : 0,
        yearlyRevenue : 0
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_ORDER,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách order",
    });
  }
};