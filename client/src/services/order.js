import axiosConfig from "../axiosConfig";

export const apiCreateOrder = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/order",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
//api get
export const apiGetOrder = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/order/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//update order
export const apiUpdateOrder = (customerID,orderID) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: "/api/order/update",
        data: {customerID,orderID}
      });
      resolve(response);
    } catch (error) {
      console.log(error);
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
      console.log(error);
      reject(error);
    }
  });
//get all
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