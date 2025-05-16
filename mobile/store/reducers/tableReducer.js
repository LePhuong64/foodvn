import actionTypes from "../actions/actionTypes";

const initialState = {
  tables: [],
  msg: null,
  count: 0,
  halls: [],
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TABLE:
      return {
        ...state,
        tables: action.data || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.GET_ALL_HALL:
      return {
        ...state,
        halls: action.data || [],
        msg: action.msg || "",
      };
    case actionTypes.UPDATE_TABLE_SUCCESS:
      if (!action.data || !action.data.id) {
        return state;
      }
      return {
        ...state,
        tables: state.tables.map((table) =>
          table.id === action.data.id ? { ...table, ...action.data } : table
        ),
        msg: action.msg || "Cập nhật thông tin bàn thành công!",
      };
    case actionTypes.UPDATE_TABLE_FAIL:
      return {
        ...state,
        msg: action.msg,
      };
    default:
      return state;
  }
};

export default tableReducer;
