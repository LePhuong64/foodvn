import db from "../models";

//get all customer
export const getAllCustomerService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.findAll({
        include: [
          {
            model: db.Role,
            as: "role",
            attributes: ["roleName"],
          },
        ],
        order: [["id", "ASC"]],
      });
      resolve({
        err: 0,
        msg: "Lấy danh sách khách hàng thành công!",
        data: response,
        count: response.length
      });
    } catch (error) {
      reject(error);
    }
  });
//get one customer
export const getOneCustomerService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.findOne({
        where: { id },
        attributes: [
          "id",
          "password",
          "customerName",
          "customerPhone",
          "customerEmail",
          "customerBirthday",
        ],
        include: [
          {
            model: db.Role,
            as: "role",
            attributes: ["roleName"],
          },
        ],
      });
      if (response) {
        resolve({
          err: 0,
          msg: "Lấy thông tin khách hàng thành công!",
          data: response,
        });
      } else {
        resolve({
          err: 1,
          msg: "Khách hàng không tồn tại!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
//update employee
export const updateCustomerService = (
  id,
  { name, phone, password, email, birthday }
) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Customer.findOne({
        where: { id },
      });
      if (!response) {
        resolve({
          err: 1,
          msg: "Khách hàng không tồn tại!",
        });
      } else {
        const updatedData = {
          ...(name && { customerName: name }),
          ...(phone && { customerPhone: phone }),
          ...(email && { customerEmail: email }),
          ...(birthday && { customerBirthday: birthday }),
          ...(password && { password: password }),
        };

        await db.Customer.update(updatedData, {
          where: { id },
        });

        resolve({
          err: 0,
          msg: "Cập nhật khách hàng thành công!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
