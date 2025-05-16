import actionTypes from "../actions/actionTypes";

const initialState = {
  cartItems: [],
  msg: null,
  count:0, 
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART_SUCCESS:
      return {
        ...state,
        cartItems: Array.isArray(action.data) ? action.data : [],
        msg: "",
      };

    case actionTypes.ADD_CART_FAIL:
      return {
        ...state,
        msg: action.msg || "Thêm vào giỏ hàng thất bại!",
      };

    case actionTypes.GET_CART:
      return {
        ...state,
        cartItems: action.data || [],
        count: action.count,
      };
    case actionTypes.DELETE_CART_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.foodID !== action.id),
        msg: action.msg || "Xóa món thành công!",
      };

    case actionTypes.DELETE_CART_FAIL:
      return {
        ...state,
        msg: action.msg || "Xóa món thất bại!",
      };

    case actionTypes.UPDATE_CART_SUCCESS:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.foodID === action.data.foodID
            ? { ...item, quantity: action.data.quantity }
            : item
        ),
      };

    case actionTypes.UPDATE_CART_FAIL:
      return {
        ...state,
        msg: action.msg || "Cập nhật giỏ hàng thất bại!",
      };

    case actionTypes.DELETE_ALL_CART_SUCCESS:
      return {
        ...state,
        cartItems: [],
        msg: action.msg || "Xóa toàn bộ món thành công!",
      };
    case actionTypes.DELETE_ALL_CART_FAIL:
      return {
        ...state,
        msg: action.msg || "Xóa toàn bộ món thất bại!",
      };
    case actionTypes.UPDATE_CART_STATE:
      return {
        ...state,
        cartItems: action.payload, 
      };
    default:
      return state;
  }
};

export default cartReducer;
