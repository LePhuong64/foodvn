import axiosConfig from "../store/axiosConfig";

export const apiGetOneEmployee = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "get",
        url: `/api/employee/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
