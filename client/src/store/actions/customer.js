import { apiGetAllCustomer, apiGetOneCustomer, apiUpdateCustomer } from "../../services/customer"
import actionTypes from "./actionTypes"

//get all customer
export const getAllCustomer = () => async (dispatch) => {
  try {
      const response = await apiGetAllCustomer()
      if (response?.data.err === 0) {
          dispatch({
              type: actionTypes.GET_ALL_CUSTOMER,
              customers: response.data.data,
              count: response.data.count,
          })
      } else {
          dispatch({
              type: actionTypes.GET_ALL_CUSTOMER,
              msg: response.data.msg
          })
      }

  } catch (error) {
      dispatch({
          type: actionTypes.GET_ALL_CUSTOMER,
          customers: null
      })
  }
}
//get one
export const getOneCustomer = (customerId) => async (dispatch) => {
  try {
    const response = await apiGetOneCustomer(customerId);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ONE_CUSTOMER,
        customer: response.data.data, 
        msg: response.data.msg, 
      });
    } else {
      dispatch({
        type: actionTypes.GET_ONE_CUSTOMER,
        customer: null,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ONE_CUSTOMER,
      customer: null,
      msg: "Có lỗi xảy ra khi lấy thông tin khách hàng!",
    });
  }
};
//update customer
export const updateCustomer = (id, payload) => async (dispatch) => {
  try {
    // Gọi API cập nhật thông tin khách hàng
    const response = await apiUpdateCustomer(id, payload);
    
    // Kiểm tra xem API có trả về thành công không
    if (response?.data.err === 0) {
      // Nếu thành công, dispatch action UPDATE_CUSTOMER_SUCCES với dữ liệu mới
      dispatch({
        type: actionTypes.UPDATE_CUSTOMER_SUCCES,
        customer: response.data.data, 
        msg: response.data.msg, 
      });
    } else {
      // Nếu có lỗi trong phản hồi, dispatch action với thông báo lỗi
      dispatch({
        type: actionTypes.UPDATE_CUSTOMER_FAIL,
        msg: response.data.msg, 
      });
    }
  } catch (error) {
    // Nếu có lỗi trong quá trình gọi API, dispatch action với thông báo lỗi
    dispatch({
      type: actionTypes.UPDATE_CUSTOMER_FAIL,
      msg: "Cập nhật thất bại, vui lòng thử lại sau!",
    });
  }
};