import actionTypes from "./actionTypes";
import { apiCreateCategory, apiDeleteCategory, apiGetAllCategory, apiUpdateCategory } from "../../services/category";

//create
export const createCategory = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateCategory(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.ADD_CATEGORY_SUCCESS,
        data: response.data.data,
      });
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.ADD_CATEGORY_FAIL,
        data: response.data.msg,
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_CATEGORY_FAIL,
      data: "Có lỗi xảy ra khi tạo loại",
    });
    return Promise.reject(new Error("Có lỗi xảy ra khi tạo loại"));
  }
};
//get
export const getAllCategory = () => async (dispatch) => {
    try {
      const response = await apiGetAllCategory();
      if (response?.data?.err === 0) {
        dispatch({
          type: actionTypes.GET_ALL_CATEGORY,
          data: response.data.data,
          count: response.data.count,
          msg: response.data.msg || "",
        });
      } else {
        dispatch({
          type: actionTypes.GET_ALL_CATEGORY,
          data: [],
          count: 0,
          msg: response.data.msg || "Lỗi khi lấy danh sách loại",
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALL_CATEGORY,
        data: [],
        count: 0,
        msg: "Có lỗi xảy ra khi lấy danh sách loại",
      });
    }
  };
//delete
export const deleteCategory = (id) => async (dispatch) => {
    try {
      const response = await apiDeleteCategory(id);
      if (response.data.err === 0) {
        dispatch({
          type: actionTypes.DELETE_CATEGORY_SUCCESS,
          id,
        });
      } else {
        dispatch({
          type: actionTypes.DELETE_CATEGORY_FAIL,
          msg: response.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_CATEGORY_FAIL,
        msg: error.message || "Đã xảy ra lỗi khi xóa loại.",
      });
    }
  };
//update
export const updateCategory = (id, payload) => async (dispatch) => {
    try {
      const response = await apiUpdateCategory(id, payload);
      if (response.data.result.err === 0) {
        dispatch({
          type: actionTypes.UPDATE_CATEGORY_SUCCESS,
          data: response.data.result,
          msg: response.data.msg || "Cập nhật thông tin loại thành công!",
        });
        dispatch(getAllCategory());
        return Promise.resolve(response.data);
      } else {
        dispatch({
          type: actionTypes.UPDATE_CATEGORY_FAIL,
          msg: response.data.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
        });
        return Promise.reject(new Error(response.data.msg));
      }
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_CATEGORY_FAIL,
        msg: "Cập nhật thất bại, vui lòng thử lại sau!",
      });
  
      return Promise.reject(
        new Error("Cập nhật thất bại, vui lòng thử lại sau!")
      );
    }
  };
  