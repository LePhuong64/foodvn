import { apiCreateReview, apiGetAllReview, apiGetReviewByFood, apiGetReviewByOrderID } from "../../services/review";
import actionTypes from "./actionTypes"

//create
export const createReview = (payload) => async (dispatch) => {
    try {
      const response = await apiCreateReview(payload);
      if (response.data.err === 0) {
        dispatch({
          type: actionTypes.CREATE_REVIEW_SUCCESS,
          data: response.data.data,
        });
        return Promise.resolve(response.data);
      } else {
        dispatch({
          type: actionTypes.CREATE_REVIEW_FAIL,
          data: response.data.msg,
        });
        return Promise.reject(new Error(response.data.msg));
      }
    } catch (error) {
      console.log(error)
      dispatch({
        type: actionTypes.CREATE_REVIEW_FAIL,
        data: "Có lỗi xảy ra khi viết đánh giá",
      });
      return Promise.reject(new Error("Có lỗi xảy ra khi đánh giá"));
    }
  };

//get review by orderID
export const getReviewByOrderID = (id) => async (dispatch) => {
  try {
    const response = await apiGetReviewByOrderID(id);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_REVIEW_BY_ORDERID,
        data: response.data.data,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_REVIEW_BY_ORDERID,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách review",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_REVIEW_BY_ORDERID,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách review",
    });
  }
};

//get review by food
export const getReviewByFood = (id) => async (dispatch) => {
  try {
    const response = await apiGetReviewByFood(id);
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_REVIEW_BY_FOOD,
        data: response.data.data,
        count: response.data.count,
        averageRating: response.data.averageRating,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_REVIEW_BY_FOOD,
        data: [],
        count: 0,
        averageRating: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách review",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_REVIEW_BY_FOOD,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách review",
    });
  }
};

//get all
export const getAllReview = () => async (dispatch) => {
  try {
    const response = await apiGetAllReview();
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_REVIEW,
        data: response.data.data,
        count: response.data.count,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_REVIEW,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách review",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_REVIEW,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách review",
    });
  }
};