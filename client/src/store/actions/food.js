import { apiCreateFood, apiDeleteFood, apiGetAllFood, apiGetOneFood, apiUpdateFood } from "../../services/food";
import actionTypes from "./actionTypes";

//create 
export const createFood = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateFood(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.ADD_FOOD_SUCCESS,
        data: response.data.data,
      });
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.ADD_FOOD_FAIL,
        data: response.data.msg,
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_FOOD_FAIL,
      data: "Có lỗi xảy ra khi tạo món ăn",
    });
    return Promise.reject(new Error("Có lỗi xảy ra khi tạo món ăn"));
  }
};
//get food
export const getAllFood = () => async (dispatch) => {
  try {
    const response = await apiGetAllFood();
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_FOOD,
        data: response.data.data,
        count: response.data.count,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_FOOD,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách món ăn",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_FOOD,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách món ăn",
    });
  }
};
//delete
export const deleteFood = (id) => async (dispatch) => {
    try {
      const response = await apiDeleteFood(id);
      if (response.data.err === 0) {
        dispatch({
          type: actionTypes.DELETE_FOOD_SUCCESS,
          id,
        });
      } else {
        dispatch({
          type: actionTypes.DELETE_FOOD_FAIL,
          msg: response.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_FOOD_FAIL,
        msg: error.message || "Đã xảy ra lỗi khi xóa món ăn.",
      });
    }
  };
//update
export const updateFood = (id, payload) => async (dispatch) => {
    try {
      const response = await apiUpdateFood(id, payload);
      if (response.data.err === 0) {
        dispatch({
          type: actionTypes.UPDATE_FOOD_SUCCESS,
          data: response.data.data,
          msg: response.data.msg || "Cập nhật thông tin món thành công!",
        });
        dispatch(getAllFood());
        return Promise.resolve(response.data);
      } else {
        dispatch({
          type: actionTypes.UPDATE_FOOD_FAIL,
          msg: response.data.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
        });
        return Promise.reject(new Error(response.data.msg));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_FOOD_FAIL,
        msg: "Cập nhật thất bại, vui lòng thử lại sau!",
      });
  
      return Promise.reject(
        new Error("Cập nhật thất bại, vui lòng thử lại sau!")
      );
    }
  };
//get one
export const getOneFood = (foodID) => async (dispatch) => {
  try {
    const response = await apiGetOneFood(foodID);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ONE_FOOD,
        food: response.data.data, 
        msg: response.data.msg, 
      });
    } else {
      dispatch({
        type: actionTypes.GET_ONE_FOOD,
        food: null,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ONE_FOOD,
      food: null,
      msg: "Có lỗi xảy ra khi lấy thông tin món ăn!",
    });
  }
};