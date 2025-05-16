import actionTypes from "../actions/actionTypes";

const initialState = {
  order: [],
  msg: null,
  count : 0,
  totalRevenue: 0,
  yearlyRevenue: 0,
  monthlyRevenue: 0,
  weeklyRevenue: 0,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: Array.isArray(action.data) ? action.data : [],
        msg: action.msg || "Tạo đơn hàng thành công!",
      };
    case actionTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        msg: action.msg || "Tạo đơn hàng thất bại!",
      };

    case actionTypes.GET_ORDER:
      return {
        ...state,
        order: Array.isArray(action.data) ? action.data : [],
        msg: action.msg || "Lấy thông tin đơn hàng thành công!",
        count: action.count
      };
    case actionTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        order: Array.isArray(action.data) ? action.data : [],
        msg: action.msg || "Cập nhật thông tin sảnh thành công!",
      };
    case actionTypes.UPDATE_ORDER_FAIL:
      return {
        ...state,
        order: state.order || null,
        msg: action.msg,
      };
    case actionTypes.UPDATE_STATUS_ORDER_SUCCESS:
      return {
        ...state,
        order: state.order.map((order) =>
          order.id === action.data.id
            ? { ...order, status: action.data.status }
            : order
        ),
        msg: action.msg || "Cập nhật trạng thái đơn hàng thành công!",
      };

    case actionTypes.UPDATE_STATUS_ORDER_FAIL:
      return {
        ...state,
        msg: action.msg || "Cập nhật thất bại, vui lòng thử lại sau!",
      };
    // case actionTypes.CANCEL_ORDER_SUCCESS:
    //   return {
    //     ...state,
    //     order: null,
    //     msg: action.msg || "Hủy đơn hàng thành công!",
    //   };
    // case actionTypes.CANCEL_ORDER_FAIL:
    //   return {
    //     ...state,
    //     msg: action.msg || "Hủy đơn hàng thất bại!",
    //   };
    case actionTypes.GET_ALL_ORDER:
      return {
        ...state,
        order: Array.isArray(action.data) ? action.data : [],
        count: action.count,
        totalRevenue: action.totalRevenue || 0,
        yearlyRevenue: action.yearlyRevenue || 0,
        monthlyRevenue: action.monthlyRevenue || 0,
        weeklyRevenue: action.weeklyRevenue || 0,
        msg: action.msg || "Lấy danh sách đơn thành công!",
      };
      
    default:
      return state;
  }
};

export default orderReducer;
