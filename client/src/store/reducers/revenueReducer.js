import actionTypes from "../actions/actionTypes";

const initialState = {
  allRevenue: [],
  weekRevenue: [],
  monthRevenue: [],
  yearRevenue: [],
  msg: "",
};

const revenueReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case actionTypes.GET_ALL_REVENUE:
      return {
        ...state,
        allRevenue: action.data || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_REVENUE_BY_WEEK:
      return {
        ...state,
        weekRevenue: action.data || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_REVENUE_BY_MONTH:
      return {
        ...state,
        monthRevenue: action.data || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_REVENUE_BY_YEAR:
      return {
        ...state,
        yearRevenue: action.data || [],
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default revenueReducer;
