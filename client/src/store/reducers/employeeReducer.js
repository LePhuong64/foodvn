import actionTypes from "../actions/actionTypes";

const initialState = {
  orderStaff: [],
  chefStaff: [],
  msg: null,
  allStaff: [],
  countOrderStaff: 0,
  countChefStaff: 0,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER_STAFF_SUCCESS:
      return {
        ...state,
        orderStaff: [...state.orderStaff, action.data],
        countOrderStaff: state.countOrderStaff + 1,
        msg: "",
      };
    case actionTypes.ADD_ORDER_STAFF_FAIL:
      return {
        ...state,
        msg: action.data,
      };
    case actionTypes.ADD_CHEF_STAFF_SUCCESS:
      return {
        ...state,
        chefStaff: [...state.chefStaff, action.data],
        countChefStaff: state.countChefStaff + 1,
        msg: "",
      };
    case actionTypes.ADD_CHEF_STAFF_FAIL:
      return {
        ...state,
        msg: action.data,
      };
    case actionTypes.GET_ALL_EMPLOYEE:
      const orderStaff = action.data.filter(
        (emp) => emp.role?.roleName === "employee"
      );
      const chefStaff = action.data.filter(
        (emp) => emp.role?.roleName === "chef"
      );

      return {
        ...state,
        allStaff: action.data || [],
        msg: action.msg || "",
        countEmployee: action.count || 0,
        orderStaff,
        chefStaff,
        countOrderStaff: orderStaff.length,
        countChefStaff: chefStaff.length,
      };
    case actionTypes.DELETE_EMPLOYEE_SUCCESS:
      const updatedAllStaff = state.allStaff.filter(
        (emp) => emp.id !== action.id
      );
      const updatedOrderStaff = updatedAllStaff.filter(
        (emp) => emp.role?.roleName === "employee"
      );
      const updatedChefStaff = updatedAllStaff.filter(
        (emp) => emp.role?.roleName === "chef"
      );

      return {
        ...state,
        allStaff: updatedAllStaff,
        countEmployee: updatedAllStaff.length,
        orderStaff: updatedOrderStaff,
        chefStaff: updatedChefStaff,
        countOrderStaff: updatedOrderStaff.length,
        countChefStaff: updatedChefStaff.length,
        msg: action.msg || "Xóa nhân viên thành công!",
      };
    case actionTypes.DELETE_EMPLOYEE_FAIL:
      return {
        ...state,
        msg: action.msg || "Xóa nhân viên thất bại!",
      };
    case actionTypes.UPDATE_EMPLOYEE_SUCCESS:
      if (!action.data || !action.data.id) {
        return {
          ...state,
          msg: "Dữ liệu cập nhật không hợp lệ!",
        };
      }
      return {
        ...state,
        allStaff: state.allStaff.map((employee) =>
          employee.id === action.data.id
            ? { ...employee, ...action.data }
            : employee
        ),
        msg: action.msg || "Cập nhật nhân viên thành công!",
      };

    case actionTypes.UPDATE_EMPLOYEE_FAIL:
      return {
        ...state,
        msg: action.msg || "Cập nhật nhân viên thất bại!",
      };
    default:
      return state;
  }
};

export default employeeReducer;
