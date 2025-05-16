import axiosConfig from "../store/axiosConfig";

//api get
export const apiGetAllOrder = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/order/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//update order status
export const apiUpdateStatusOrder = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "/api/order/update-order-status",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      // console.log(error);
      reject(error);
    }
  });
//update food status
export const apiUpdateStatusFood = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "/api/order/update-food-status",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      // console.log(error);
      reject(error);
    }
  });