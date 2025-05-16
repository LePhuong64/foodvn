import actionTypes from "../actions/actionTypes";

const initialState = {
  order: [],
  msg: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDER:
      return {
        ...state,
        order: action.data,
        msg: action.msg || "Lấy thông tin đơn hàng thành công!",
      };
    case actionTypes.UPDATE_STATUS_FOOD_SUCCESS:
      return {
        ...state,
        order: state.order.map((order) => ({
          ...order,
          orderDetails: order.orderDetails.map((food) =>
            food.id === action.data.id
              ? { ...food, status: action.data.status }
              : food
          ),
        })),
        msg: action.msg || "Cập nhật trạng thái món ăn thành công!",
      };

    case actionTypes.UPDATE_STATUS_ORDER_SUCCESS:
      return {
        ...state,
        order: state.order.map((o) =>
          o.id === action.data.id ? { ...o, status: action.data.status } : o
        ),
        msg: action.msg || "Cập nhật trạng thái đơn hàng thành công!",
      };

    case actionTypes.UPDATE_STATUS_ORDER_FAIL:
    case actionTypes.UPDATE_STATUS_FOOD_FAIL:
      return {
        ...state,
        msg: action.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
      };
    default:
      return state;
  }
};

export default orderReducer;
