import axiosConfig from "../axiosConfig";

//api create
export const apiCreateFood = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("price", payload.price);
      formData.append("categoryName", payload.categoryName);
      formData.append("description", payload.description);
      if (payload.image) {
        formData.append("image", payload.image);
      }
      const response = await axiosConfig({
        method: "POST",
        url: "/api/food",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//get all
export const apiGetAllFood = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/food",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//delete
export const apiDeleteFood = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/food/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//update
export const apiUpdateFood = (id, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("price", payload.price);
      formData.append("description", payload.description);
      if (payload.image) {
        formData.append("image", payload.image);
      }
      const response = await axiosConfig({
        method: "PUT",
        url: `/api/food/${id}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//get one
export const apiGetOneFood = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/food/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
