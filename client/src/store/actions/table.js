import {
  apiAddHall,
  apiCreateTable,
  apiDeleteHall,
  apiDeleteTable,
  apiGetAllHall,
  apiGetAllTable,
  apiUpdateHall,
  apiUpdateTable,
} from "../../services/table";
import actionTypes from "./actionTypes";

export const createTable = (payload) => async (dispatch) => {
  try {
    const response = await apiCreateTable(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.ADD_TABLE_SUCCESS,
        data: response.data.data,
      });
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.ADD_TABLE_FAIL,
        data: response.data.msg,
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TABLE_FAIL,
      data: "Có lỗi xảy ra khi tạo bàn",
    });
    return Promise.reject(new Error("Có lỗi xảy ra khi tạo bàn"));
  }
};
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
    dispatch({
      type: actionTypes.GET_ALL_TABLE,
      data: [],
      count: 0,
      msg: "Có lỗi xảy ra khi lấy danh sách bàn",
    });
  }
};
//delete
export const deleteTable = (id) => async (dispatch) => {
  try {
    const response = await apiDeleteTable(id);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.DELETE_TABLE_SUCCESS,
        id,
      });
    } else {
      dispatch({
        type: actionTypes.DELETE_TABLE_FAIL,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_TABLE_FAIL,
      msg: error.message || "Đã xảy ra lỗi khi xóa bàn.",
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
//get all hall
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
//add hall
export const createHall = (payload) => async (dispatch) => {
  try {
    const response = await apiAddHall(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.ADD_HALL_SUCCESS,
        data: response.data.data,
      });
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.ADD_HALL_FAIL,
        data: response.data.msg,
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_HALL_FAIL,
      data: "Có lỗi xảy ra khi tạo sảnh",
    });
    return Promise.reject(new Error("Có lỗi xảy ra khi tạo sảnh"));
  }
};
//delete hall
export const deleteHall = (id) => async (dispatch) => {
  try {
    const response = await apiDeleteHall(id);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.DELETE_HALL_SUCCESS,
        id,
      });
    } else {
      dispatch({
        type: actionTypes.DELETE_HALL_FAIL,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_HALL_FAIL,
      msg: error.message || "Đã xảy ra lỗi khi xóa sảnh.",
    });
  }
};
//update hall
export const updateHall = (id, payload) => async (dispatch) => {
  try {
    const response = await apiUpdateHall(id, payload);

    if (response.data.err === 0 && response.data.data) {
      dispatch({
        type: actionTypes.UPDATE_HALL_SUCCESS,
        data: response.data.data, 
        msg: response.data.msg || "Cập nhật thông tin sảnh thành công!",
      });

      await dispatch(getAllHall());
      return Promise.resolve(response.data);
    } else {
      dispatch({
        type: actionTypes.UPDATE_HALL_FAIL,
        msg: response.data.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
      });
      return Promise.reject(new Error(response.data.msg));
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_HALL_FAIL,
      msg: "Cập nhật thất bại, vui lòng thử lại sau!",
    });

    return Promise.reject(
      new Error("Cập nhật thất bại, vui lòng thử lại sau!")
    );
  }
};
