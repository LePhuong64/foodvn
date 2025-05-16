import authReducer from "./authReducer";
import userReducer from "./userReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";
import customerReducer from "./customerReducer";
import tableReducer from "./tableReducer";
import foodReducer from "./foodRducer";
import categoryReducer from "./categoryReducer";
import employeeReducer from "./employeeReducer";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";
import reviewReducer from "./reviewReducer";
import revenueReducer from "./revenueReducer";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key : "auth",
    whitelist: ["isLoggedIn", "token", "role","id"]
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    user: userReducer,
    customer: customerReducer,
    table : tableReducer,
    food : foodReducer,
    category : categoryReducer,
    employee : employeeReducer,
    cart: cartReducer,
    order: orderReducer,
    review: reviewReducer,
    revenue: revenueReducer,
});

export default rootReducer;