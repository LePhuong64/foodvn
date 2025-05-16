import actionTypes from "../actions/actionTypes";
const initialState = {
    employee: [],
    msg:'',
}

const employeeReducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.GET_ONE_EMPLOYEE:
            return{
                ...state,
                employee : action.employee || null,
                msg : action.msg || '',
            }
        default:
            return state
    }
}

export default employeeReducer