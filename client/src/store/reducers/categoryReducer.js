import actionTypes from "../actions/actionTypes";

const initialState = {
  categories: [],
  msg: null,
  count: 0,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.data],
        msg: "",
      };

    case actionTypes.ADD_CATEGORY_FAIL:
      return {
        ...state,
        msg: action.data,
      };
    case actionTypes.GET_ALL_CATEGORY:
      return {
        ...state,
        categories: (action.data || []).filter((c) => c.categoryName),
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter((category) => category.id !== action.id),
        msg: action.msg || "Xóa loại thành công!",
      };
    case actionTypes.DELETE_CATEGORY_FAIL:
      return {
        ...state,
        msg: action.msg || "Xóa loại thất bại!",
      };

    case actionTypes.UPDATE_CATEGORY_SUCCESS:
      if (!action.data || !action.data.id) {
        return state;
      }
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === action.data.id ? { ...category, ...action.data } : category
        ),    
        msg: action.msg || "Cập nhật thông tin loại thành công!",
      };
    case actionTypes.UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        msg: action.msg,
      };
    default:
      return state;
  }
};

export default categoryReducer;
