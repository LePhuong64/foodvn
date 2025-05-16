import db from "../models";
const admin = require("../config/firebaseConfig");

export const sendNotification = async (roleName, title, body) => {
  try {
    // Tìm role dựa trên roleName
    const role = await db.Role.findOne({ where: { roleName } });
    if (!role) {
      return { err: 1, msg: `Không tìm thấy role: ${roleName}` };
    }

    // Lấy danh sách nhân viên có role tương ứng
    const employees = await db.Employee.findAll({
      attributes: ["fcmToken"],
      where: { 
        roleID: role.id, 
        fcmToken: { [db.Sequelize.Op.ne]: null }
      },
    });

    const tokens = employees.map((emp) => emp.fcmToken);

    if (tokens.length > 0) {
      const message = {
        notification: { title, body },
        tokens: tokens,
      };

      const response = await admin.messaging().sendEachForMulticast(message);

      if (response.failureCount > 0) {
        return { err: 1, msg: "Một số thiết bị không nhận được thông báo!", errors: response.responses.filter((res) => !res.success) };
      }

      return { err: 0, msg: "Thông báo FCM đã được gửi thành công!", data: response };
    } else {
      return { err: 1, msg: `Không có nhân viên nào có role "${roleName}" để nhận thông báo!` };
    }
  } catch (error) {
    return { err: 1, msg: "Lỗi khi gửi FCM!", error: error.message };
  }
};




