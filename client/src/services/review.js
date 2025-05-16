import axiosConfig from "../axiosConfig";

//api create
export const apiCreateReview = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/api/review",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

//api get review theo order
export const apiGetReviewByOrderID = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/review/order/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

//api get review theo food
export const apiGetReviewByFood = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/api/review/food/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
  
//get all
export const apiGetAllReview = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/review",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
