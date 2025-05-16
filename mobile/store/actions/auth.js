import { apiLogin } from "../../services/auth";
import actionTypes from "./actionTypes";

//login
export const login = (payload) => async (dispatch) => {
    try {
      const response = await apiLogin(payload);
  
      if (response.data.err === 0) {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          data: {
            token: response.data.token,
            role: response.data.role,
            id : response.data.id,
            fcmToken: response.data.fcmToken,
          },
        });
      } else {
        dispatch({
          type: actionTypes.LOGIN_FAIL,
          data: response.data.msg,
        });
      }
    } catch (error) {
      // console.error("Login error:", error);
      dispatch({
        type: actionTypes.LOGIN_FAIL,
        data: "Có lỗi xảy ra khi đăng nhập.",
      });
    }
  };
//logout
export const logout = () => ({
    type: actionTypes.LOGOUT,
  });
  