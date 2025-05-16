import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import authReducer from "./authReducer";
import tableReducer from "./tableReducer";
import employeeReducer from "./employeeReducer";
import orderReducer from "./orderReducer";


const commonConfig = {
  storage: AsyncStorage, 
  stateReconciler: autoMergeLevel2,
};

const authConfig = {
  ...commonConfig,
  key: "auth",
  whitelist: ["isLoggedIn", "token", "role", "id"], 
};

const rootReducer = combineReducers({
  auth: persistReducer(authConfig,authReducer),
  table: tableReducer,
  employee : employeeReducer,
  order: orderReducer
});

export default rootReducer;
