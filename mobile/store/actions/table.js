import { apiGetAllHall, apiGetAllTable, apiUpdateTable } from "../../services/table";
import actionTypes from "./actionTypes";

//get table
export const getAllTable = () => async (dispatch) => {
  try {
    const response = await apiGetAllTable();
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_TABLE,
        data: response.data.data,
        count: response.data.count,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_TABLE,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách bàn",
      });
    }
  } catch (error) {
    console.error("Error fetching tables:", error);
    dispatch({
      type: actionTypes.GET_ALL_TABLE,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách bàn",
    });
  }
};
//get hall
export const getAllHall = () => async (dispatch) => {
  try {
    const response = await apiGetAllHall();
    if (response?.data?.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_HALL,
        data: response.data.data,
        count: response.data.count,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_HALL,
        data: [],
        count: 0,
        msg: response.data.msg || "Lỗi khi lấy danh sách sảnh",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_HALL,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách sảnh",
    });
  }
};
//update 
export const updateTable = (id, payload) => async (dispatch) => {
  try {
    const response = await apiUpdateTable(id, payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.UPDATE_TABLE_SUCCESS,
        data: response.data.data,
        msg: response.data.msg || "Cập nhật thông tin bàn thành công!",
      });
      dispatch(getAllTable());
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.UPDATE_TABLE_FAIL,
        msg: response.data.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_TABLE_FAIL,
      msg: "Cập nhật thất bại, vui lòng thử lại sau!",
    });

    return Promise.reject(
      new Error("Cập nhật thất bại, vui lòng thử lại sau!")
    );
  }
};