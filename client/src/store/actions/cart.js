import {
  apiAddCart,
  apiDeleteAllCart,
  apiDeleteCart,
  apiGetCart,
  apiUpdateCart,
} from "../../services/cart";
import actionTypes from "./actionTypes";

//get cart
export const getCart = (id) => async (dispatch) => {
  try {
    const response = await apiGetCart(id);

    if (response.data && response.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CART,
        data: response.data.data || [],
        count: response.data.count,
        msg: response.data.msg || "",
      });
    } else {
      dispatch({
        type: actionTypes.GET_CART,
        data: [],
        msg: response.data.msg || "Lỗi khi lấy giỏ hàng",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CART,
      data: [],
      msg: "Có lỗi xảy ra khi lấy giỏ hàng",
    });
  }
};

//add cart
export const addCart = (payload) => async (dispatch) => {
  try {
    const response = await apiAddCart(payload);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.ADD_CART_SUCCESS,
        data: response.data.data,
        msg: response.data.msg,
      });
      dispatch(getCart(payload.customerID));
    } else {
      dispatch({
        type: actionTypes.ADD_CART_FAIL,
        data: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_CART_FAIL,
      data: "Có lỗi xảy ra khi thêm vào giỏ hàng",
    });
  }
};
//delete cart
export const deleteCart =
  (customerID, foodID) => async (dispatch, getState) => {
    try {
      const response = await apiDeleteCart(customerID, foodID);
      if (response.data.err === 0) {
        dispatch({
          type: actionTypes.UPDATE_CART_STATE,
          payload: {
            cartItems: getState().cart.cartItems.filter(
              (item) => item.foodID !== foodID
            ),
            count: response.data.count, 
          },
        });
        dispatch(getCart(customerID))
      } else {
        dispatch({
          type: actionTypes.DELETE_CART_FAIL,
          data: response.data.msg,
        });
      }
    } catch (error) {
      dispatch({
        type: actionTypes.DELETE_CART_FAIL,
        data: "Có lỗi xảy ra khi xóa khỏi giỏ hàng",
      });
    }
  };
//delete all cart
export const deleteAllCart = (customerID) => async (dispatch) => {
  try {
    const response = await apiDeleteAllCart(customerID);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.DELETE_ALL_CART_SUCCESS,
        msg: response.data.msg,
      });
      dispatch(getCart(customerID))
    } else {
      dispatch({
        type: actionTypes.DELETE_ALL_CART_FAIL,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_ALL_CART_FAIL,
      msg: "Có lỗi xảy ra khi xóa giỏ hàng",
    });
  }
};
//update cart
export const updateCart = (payload) => async (dispatch) => {
  try {
    const response = await apiUpdateCart(payload);

    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.UPDATE_CART_SUCCESS,
        data: response.data.data,
        count: response.data.count,
      });
      dispatch(getCart(payload.customerID))
    } else {
      dispatch({
        type: actionTypes.UPDATE_CART_FAIL,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_CART_FAIL,
      msg: "Cập nhật giỏ hàng thất bại!",
    });
  }
};
