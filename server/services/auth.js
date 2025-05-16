import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = (password) => {
  if (!password) throw new Error("Password chưa được truyền vào!");
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//chuyển đổi định dạng ngày sinh
const formatBirthdayForDB = (date) => {
  if (!date) return null;

  // Xử lý ngày có dấu "/"
  if (date.includes("/")) {
    const parts = date.split("/");
    if (parts.length !== 3) return null; // Định dạng không hợp lệ

    let day, month, year;

    if (parts[2].length === 4) {
      // Giả định định dạng DD/MM/YYYY hoặc MM/DD/YYYY
      const [part1, part2, part3] = parts;
      if (part1 > 12) {
        // Nếu phần đầu > 12 => chắc chắn là DD/MM/YYYY
        [day, month, year] = [part1, part2, part3];
      } else {
        // Không chắc là MM/DD/YYYY hay DD/MM/YYYY -> Kiểm tra ngày hợp lệ
        const testDate1 = new Date(`${part3}-${part2}-${part1}`);
        const testDate2 = new Date(`${part3}-${part1}-${part2}`);

        if (!isNaN(testDate1.getTime())) {
          [day, month, year] = [part1, part2, part3];
        } else if (!isNaN(testDate2.getTime())) {
          [day, month, year] = [part2, part1, part3];
        } else {
          return null; // Không xác định được định dạng hợp lệ
        }
      }
    } else {
      return null; // Nếu năm không có 4 chữ số, không hợp lệ
    }

    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }

  // Xử lý ngày có dấu "-"
  if (date.includes("-")) {
    const parts = date.split("-");
    if (parts.length !== 3) return null; // Định dạng không hợp lệ

    let [year, month, day] = parts;
    if (year.length === 4) {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    } else {
      return null; // Nếu năm không có 4 chữ số, không hợp lệ
    }
  }

  return null; // Nếu không thuộc định dạng nào hợp lệ
};

//register for customer
export const registerService = ({ email, name, phone, password, birthday }) =>
  new Promise(async (resolve, reject) => {
    try {
      const customerRole = await db.Role.findOne({
        where: { roleName: "Customer" },
      });
      const formattedBirthday = formatBirthdayForDB(birthday);
      const response = await db.Customer.findOrCreate({
        where: { customerPhone: phone },
        defaults: {
          customerEmail: email,
          password: hashPassword(password),
          customerName: name,
          customerPhone: phone,
          customerBirthday: formattedBirthday,
          roleID: customerRole.id,
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, phone: response[0].phone },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token ? "Đăng ký thành công!" : "Tài khoản đã tồn tại!",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
// login
export const loginService = async ({ phone, password, fcmToken }) => {
  try {
    // Tìm kiếm trong bảng Customer
    let response = await db.Customer.findOne({
      where: { customerPhone: phone },
      include: [{ model: db.Role, as: "role", attributes: ["roleName"] }],
      nest: true,
      raw: true,
    });

    let userType = "customer"; // Mặc định là khách hàng

    // Nếu không tìm thấy, tìm trong bảng Employee
    if (!response) {
      response = await db.Employee.findOne({
        where: { employeePhone: phone },
        include: [{ model: db.Role, as: "role", attributes: ["roleName"] }],
        nest: true,
        raw: true,
      });
      userType = "employee";
    }

    // Nếu vẫn không tìm thấy, trả lỗi
    if (!response) {
      return {
        err: 1,
        msg: "Số điện thoại bạn nhập không tồn tại. Hãy nhập lại!",
      };
    }

    // Kiểm tra mật khẩu
    const isCorrectPassword = bcrypt.compareSync(password, response.password);
    if (!isCorrectPassword) {
      return { err: 2, msg: "Bạn nhập sai mật khẩu. Hãy nhập lại nhé!" };
    }

    //nhận token thông báo
    if (userType === "employee" && fcmToken) {
      await db.Employee.update({ fcmToken }, { where: { id: response.id } });
    }
    // Tạo token
    const token = jwt.sign(
      {
        id: response.id,
        phone:
          userType === "customer"
            ? response.customerPhone
            : response.employeePhone,
        role: response.role.roleName,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return {
      err: 0,
      msg: "Đăng nhập thành công!",
      token,
      userType,
      role: response.role.roleName,
      id: response.id,
      fcmToken: fcmToken,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
