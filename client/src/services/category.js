import axiosConfig from "../axiosConfig";

//api create
export const apiCreateCategory = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/category",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//get all 
export const apiGetAllCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/category",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//delete
export const apiDeleteCategory = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/category/${id}`,  
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//update 
  export const apiUpdateCategory = (id,payload) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axiosConfig({
          method: "PUT",
          url: `/api/category/${id}`,
          data: payload,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });