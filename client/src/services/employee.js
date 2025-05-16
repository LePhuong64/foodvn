import axiosConfig from "../axiosConfig";

//api tạo nhân viên order
export const apiCreateOrderStaff = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("phone", payload.phone);
      formData.append("gender", payload.gender);
      if (payload.image) {
        formData.append("image", payload.image);
      }

      const response = await axiosConfig({
        method: "POST",
        url: "/api/employee/order",
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
//api tạo nhân viên bếp
export const apiCreateChefStaff = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("phone", payload.phone);
      formData.append("gender", payload.gender);
      if (payload.image) {
        formData.append("image", payload.image);
      }

      const response = await axiosConfig({
        method: "POST",
        url: "/api/employee/chef",
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
export const apiGetAllEmployee = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/api/employee/all",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//delete
export const apiDeleteEmployee = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "DELETE",
        url: `/api/employee/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
//update
export const apiUpdateEmployee = (id, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name || "");
      formData.append("phone", payload.phone || "");
      formData.append("gender", payload.gender || "");

      if (payload.image) {
        formData.append("image", payload.image);
      }

      const response = await axiosConfig({
        method: "PUT",
        url: `/api/employee/${id}`,
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
