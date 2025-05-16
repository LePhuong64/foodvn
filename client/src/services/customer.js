import axiosConfig from "../axiosConfig";

//get all
export const apiGetAllCustomer = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: "/api/customer/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//get one
export const apiGetOneCustomer = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/customer/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//update
export const apiUpdateCustomer = (id,payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "put",
        url: `/api/customer/${id}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });