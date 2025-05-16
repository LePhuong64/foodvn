import actionTypes from "../actions/actionTypes";

const initialState = {
  foods: [],
  msg: null,
  count: 0,
  food: null,
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FOOD_SUCCESS:
      return {
        ...state,
        foods: [...state.foods, action.data],
        msg: "",
      };

    case actionTypes.ADD_FOOD_FAIL:
      return {
        ...state,
        msg: action.data,
      };
    case actionTypes.GET_ALL_FOOD:
      return {
        ...state,
        foods: action.data || [],
        msg: action.msg || "",
        count: action.count || 0,
      };

    case actionTypes.DELETE_FOOD_SUCCESS:
      return {
        ...state,
        food: state.foods.filter((food) => food.id !== action.id),
        msg: action.msg || "Xóa món ăn thành công!",
      };
    case actionTypes.DELETE_FOOD_FAIL:
      return {
        ...state,
        msg: action.msg || "Xóa món ăn thất bại!",
      };

    case actionTypes.UPDATE_FOOD_SUCCESS:
      if (!action.data || !action.data.id) {
        return state;
      }
      return {
        ...state,
        foods: state.foods.map((food) =>
          food.id === action.data.id ? { ...food, ...action.data } : food
        ),
        msg: action.msg || "Cập nhật thông tin món thành công!",
      };
    case actionTypes.UPDATE_FOOD_FAIL:
      return {
        ...state,
        msg: action.msg,
      };
    case actionTypes.GET_ONE_FOOD:
      return {
        ...state,
        food: action.food || null,
        msg: action.msg || "",
      };
    default:
      return state;
  }
};

export default foodReducer;
