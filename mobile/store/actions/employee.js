import { apiGetOneEmployee } from "../../services/employee";
import actionTypes from "./actionTypes";

export const getOneEmployee = (employID) => async (dispatch) => {
    try {
      const response = await apiGetOneEmployee(employID);
      if (response?.data.err === 0) {
        dispatch({
          type: actionTypes.GET_ONE_EMPLOYEE,
          employee: response.data.data, 
          msg: response.data.msg, 
        });
      } else {
        dispatch({
          type: actionTypes.GET_ONE_EMPLOYEE,
          employee: null,
          msg: response.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ONE_EMPLOYEE,
        customer: null,
        msg: "Có lỗi xảy ra khi lấy thông tin!",
      });
    }
  };