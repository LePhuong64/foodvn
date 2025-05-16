import actionTypes from "../actions/actionTypes";
const initState = {
  customers: [],
  msg: "",
  count: 0,
  customer: null,
};

const customerReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_CUSTOMER:
      return {
        ...state,
        customers: action.customers || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    case actionTypes.GET_ONE_CUSTOMER:
      return {
        ...state,
        customer: action.customer || null,
        msg: action.msg || "",
      };
    case actionTypes.UPDATE_CUSTOMER_SUCCES:
      return {
        ...state,
        customer: action.customer || null,
        msg: action.msg || "",
      };

    case actionTypes.UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        customer: null,
        msg: action.msg || "", 
      };
    default:
      return state;
  }
};

export default customerReducer;
