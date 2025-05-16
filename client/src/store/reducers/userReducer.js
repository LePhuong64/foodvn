import actionTypes from "../actions/actionTypes"

const initState = {
    userData : {},
}

const userReducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentData: {}
            }
        default:
            return state
    }
}

export default userReducer