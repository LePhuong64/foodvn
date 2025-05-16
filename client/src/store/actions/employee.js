import {
  apiCreateChefStaff,
  apiCreateOrderStaff,
  apiDeleteEmployee,
  apiGetAllEmployee,
  apiUpdateEmployee,
} from "../../services/employee";
import actionTypes from "./actionTypes";

//create nhân viên order
export const createOrderStaff = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateOrderStaff(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.ADD_ORDER_STAFF_SUCCESS,
        data: response.data.data,
      });
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.ADD_ORDER_STAFF_FAIL,
        data: response.data.msg,
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_ORDER_STAFF_FAIL,
      data: "Có lỗi xảy ra khi tạo nhân viên order",
    });
    return Promise.reject(new Error("Có lỗi xảy ra khi tạo nhân viên order"));
  }
};
//create nhân viên bếp
export const createChefStaff = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateChefStaff(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.ADD_CHEF_STAFF_SUCCESS,
        data: response.data.data,
      });
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.ADD_CHEF_STAFF_FAIL,
        data: response.data.msg,
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_CHEF_STAFF_FAIL,
      data: "Có lỗi xảy ra khi tạo nhân viên bếp",
    });
    return Promise.reject(new Error("Có lỗi xảy ra khi tạo nhân viên bếp"));
  }
};
//get all
export const getAllEmployee = () => async (dispatch) => {
  try {
    const response = await apiGetAllEmployee();
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_EMPLOYEE,
        data: response.data.data,
        count: response.data.count,
        msg: response.data.msg || "",
      });
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.GET_ALL_EMPLOYEE,
        data: response.data.msg,
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách nhân viên",
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_EMPLOYEE,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách bàn",
    });
  }
};
//update
export const updateEmployee = (id, payload) => async (dispatch) => {
  try {
    const response = await apiUpdateEmployee(id, payload);
  
    if (response.data.success) {
      dispatch({
        type: actionTypes.UPDATE_EMPLOYEE_SUCCESS,
        data: response.data.data,
        msg: response.data.msg || "Cập nhật thông tin nhân viên thành công!",
      });
      dispatch(getAllEmployee());
      return response.data; 
    } else {
      dispatch({
        type: actionTypes.UPDATE_EMPLOYEE_FAIL,
        msg: response.data.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
      });
      throw new Error(response.data.msg || "Cập nhật thất bại!");
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_EMPLOYEE_FAIL,
      msg: "Cập nhật thất bại, vui lòng thử lại sau!",
    });
    throw error; 
  }
};
//delete
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    const response = await apiDeleteEmployee(id);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.DELETE_EMPLOYEE_SUCCESS,
        id,
      });
    } else {
      dispatch({
        type: actionTypes.DELETE_EMPLOYEE_FAIL,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_EMPLOYEE_FAIL,
      msg: error.message || "Đã xảy ra lỗi khi xóa nhân viên.",
    });
  }
};
