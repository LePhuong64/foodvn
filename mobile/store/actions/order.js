import { apiGetAllOrder, apiUpdateStatusFood, apiUpdateStatusOrder } from "../../services/order";
import actionTypes from "./actionTypes";

//get all order
export const getAllOrder = () => async (dispatch) => {
  try {
    const response = await apiGetAllOrder();
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ORDER,
        data: response.data.data,
        msg: response.data.msg || "",
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
      dispatch(getAllOrder());
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
//update food status
export const updateFoodStatus = (payload) => async (dispatch) => {
  try {
    const response = await apiUpdateStatusFood(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.UPDATE_STATUS_FOOD_SUCCESS,
        data: response.data.data,
        msg: response.data.msg || "Cập nhật đơn hàng thành công!",
      });
      dispatch(getAllOrder()); 
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.UPDATE_STATUS_FOOD_FAIL,
        msg: response.data.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_STATUS_FOOD_FAIL,
      msg: "Cập nhật thất bại, vui lòng thử lại sau!",
    });

    return Promise.reject(
      new Error("Cập nhật thất bại, vui lòng thử lại sau!")
    );
  }
};
