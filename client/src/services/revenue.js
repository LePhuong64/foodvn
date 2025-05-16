import axiosConfig from "../axiosConfig";

//get all
export const apiGetAllRevenue = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/revenue",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

//get by year
export const apiGetYearRevenue = (year) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axiosConfig({
          method: "GET",
          url: `/api/revenue/year/${year}`,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
//get by month
export const apiGetMonthRevenue = (year) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axiosConfig({
          method: "GET",
          url: `/api/revenue/month/${year}`,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
//get by week
export const apiGetWeekRevenue = (year) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await axiosConfig({
          method: "GET",
          url: `/api/revenue/week/${year}`,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
