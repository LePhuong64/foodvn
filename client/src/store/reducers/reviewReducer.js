import actionTypes from "../actions/actionTypes";

const initialState = {
  review: [],
  msg: "",
  count: 0,
  averageRating : 0
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        review: [...state.review, action.data],
        msg: "",
      };

    case actionTypes.CREATE_REVIEW_FAIL:
      return {
        ...state,
        msg: action.data,
      };
    case actionTypes.GET_REVIEW_BY_ORDERID:
      return {
        ...state,
        review: action.data || [],
        msg: action.msg || "",
      };
    case actionTypes.GET_REVIEW_BY_FOOD:
      return {
        ...state,
        review: action.data || [],
        msg: action.msg || "",
        count: action.count || 0,
        averageRating : action.averageRating || 0,
      };
    case actionTypes.GET_ALL_REVIEW:
      return {
        ...state,
        review: action.data || [],
        msg: action.msg || "",
        count: action.count || 0,
      };
    default:
      return state;
  }
};

export default reviewReducer;
