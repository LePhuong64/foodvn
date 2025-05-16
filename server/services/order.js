import db from "../models";
import { sendNotification } from "./notification";
const { Op } = require("sequelize");

//create order
export const createOrderService = ({ customerID, tableNumber }) =>
  new Promise(async (resolve, reject) => {
    try {
      // Tìm bàn theo số bàn
      const table = await db.Table.findOne({ where: { tableNumber } });
      if (!table) {
        return resolve({ err: 1, msg: "Bàn không tồn tại!" });
      }
      //Bàn đầy thì báo bàn khác
      if (table.status !== "Trống") {
        return resolve({ err: 1, msg: "Bàn đã có khách, mời bạn chọn bàn!" });
      }
      // Kiểm tra khách đã có order chưa
      const existingOrder = await db.Order.findOne({
        where: { customerID, status: "pending" },
      });

      if (existingOrder) {
        return resolve({ err: 1, msg: "Khách hàng đang được phục vụ!" });
      }

      // Tạo order mới nhưng chưa có món ăn
      const order = await db.Order.create({
        customerID,
        tableID: table.id,
        status: "pending",
        total: 0,
      });

      await db.Table.update({ status: "Đầy" }, { where: { id: table.id } });

      resolve({ err: 0, msg: "Tạo order thành công!", data: order });
    } catch (error) {
      reject(error);
    }
  });

//get order theo khách hàng
export const getOrderService = (customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findAll({
        where: { customerID },
        attributes: ["id", "voucherID", "status", "total", "updatedAt"],
        include: [
          {
            model: db.Customer,
            as: "customer",
            attributes: ["id", "customerName"],
          },
          {
            model: db.Table,
            as: "table",
            attributes: ["id", "tableNumber", "status"],
            include: [
              {
                model: db.Hall,
                as: "hall",
                attributes: ["name"],
              },
            ],
          },
          {
            model: db.OrderDetail,
            as: "orderDetails",
            attributes: ["quantity", "totalPrice", "status"],
            include: [
              {
                model: db.Food,
                as: "food",
                attributes: ["id", "name", "price", "foodImg"],
              },
            ],
          },
        ],
      });

      if (!order) {
        return resolve({
          err: 1,
          msg: "Không tìm thấy đơn hàng đang chờ!",
        });
      }

      resolve({
        err: 0,
        msg: "Lấy order thành công!",
        data: order,
        count: order.length,
      });
    } catch (error) {
      reject(error);
    }
  });

//update order dùng để thêm món từ giỏ hàng vào
export const updateOrderService = ({ customerID, orderID }) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findOne({
        where: {
          id: orderID,
          customerID,
          status: { [Op.ne]: "complete" },
        },
        include: [
          {
            model: db.Table,
            as: "table",
            attributes: ["tableNumber"],
            include: [
              {
                model: db.Hall,
                as: "hall",
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      if (!order) {
        return resolve({ err: 1, msg: "Không tìm thấy đơn hàng!" });
      }

      // Nếu đơn hàng đã thanh toán, không cho cập nhật
      if (order.status === "paid") {
        return resolve({
          err: 1,
          msg: "Đơn hàng đã thanh toán, không thể cập nhật!",
        });
      }

      const cartItems = await db.Cart.findAll({ where: { customerID } });
      if (!cartItems.length) {
        return resolve({ err: 1, msg: "Giỏ hàng đang trống!" });
      }

      let additionalTotalPrice = 0;

      for (const item of cartItems) {
        const { foodID, quantity } = item;
        const food = await db.Food.findOne({ where: { id: foodID } });
        if (!food) continue;

        const totalPrice = food.price * quantity;

        // Tìm món ăn trong OrderDetail
        const existingOrderDetail = await db.OrderDetail.findOne({
          where: { orderID: order.id, foodID },
        });

        if (existingOrderDetail) {
          if (existingOrderDetail.status === "served") {
            // Nếu món đã hoàn thành, tạo một dòng mới với trạng thái "pending"
            await db.OrderDetail.create({
              orderID: order.id,
              foodID,
              quantity,
              totalPrice,
              status: "pending",
            });
            additionalTotalPrice += totalPrice;
          } else {
            // Nếu món chưa hoàn thành, chỉ tăng số lượng và tổng giá
            additionalTotalPrice += quantity * food.price;
            existingOrderDetail.quantity += quantity;
            existingOrderDetail.totalPrice =
              existingOrderDetail.quantity * food.price;
            await existingOrderDetail.save();
          }
        } else {
          // Nếu là món mới hoàn toàn, tạo mới
          await db.OrderDetail.create({
            orderID: order.id,
            foodID,
            quantity,
            totalPrice,
            status: "pending",
          });
          additionalTotalPrice += totalPrice;
        }
      }

      // Cập nhật tổng tiền đơn hàng
      const updatedTotal = parseFloat(order.total) + additionalTotalPrice;
      await order.update({ total: updatedTotal });

      // Xóa giỏ hàng
      await db.Cart.destroy({ where: { customerID } });

      //thông báo
      const tableNumber = order.table?.tableNumber || "Không rõ";
      const hallName = order.table?.hall?.name || "Không rõ";
      await sendNotification(
        "employee",
        "Khách vừa gọi món",
        `Bàn ${tableNumber} - ${hallName} vừa gọi món, vui lòng chuẩn bị.`
      );

      resolve({ err: 0, msg: "Cập nhật đơn hàng thành công!", data: order });
    } catch (error) {
      reject(error);
    }
  });

//update food status
export const updateFoodStatusService = ({ orderDetailID, status }) =>
  new Promise(async (resolve, reject) => {
    try {
      const orderDetail = await db.OrderDetail.findByPk(orderDetailID, {
        include: [
          {
            model: db.Order,
            as: "order",
            include: [
              {
                model: db.Table,
                as: "table",
                include: [{ model: db.Hall, as: "hall" }],
              },
            ],
          },
          {
            model: db.Food,
            as: "food",
            attributes: ["name"],
          },
        ],
      });

      if (!orderDetail) {
        return resolve({ err: 1, msg: "Món ăn không tồn tại!" });
      }

      // Cập nhật trạng thái món ăn
      orderDetail.status = status;
      await orderDetail.save();

      // Lấy thông tin bàn và sảnh từ Order
      const tableNumber = orderDetail.order?.table?.tableNumber || "N/A";
      const hallName = orderDetail.order?.table?.hall?.name || "N/A";
      const foodName = orderDetail.food?.name || "N/A";

      // Gửi thông báo khi món ăn hoàn thành
      switch (status) {
        case "complete":
          await sendNotification(
            "employee",
            "Cập nhật món!",
            `Món ${foodName} của bàn ${tableNumber} - ${hallName} đã chế biến xong`
          );
          break;

        case "served":
          await sendNotification(
            "chef",
            "Cập nhật món!",
            `Món ${foodName} của bàn ${tableNumber} - ${hallName} đã phục vụ`
          );
          break;
        default:
          break;
      }

      resolve({
        err: 0,
        msg: "Cập nhật trạng thái món ăn thành công!",
        data: orderDetail,
      });
    } catch (error) {
      reject(error);
    }
  });

// Update order status
export const updateOrderStatusService = ({ orderID, status, employeeID }) =>
  new Promise(async (resolve, reject) => {
    try {
      const order = await db.Order.findByPk(orderID, {
        include: [
          {
            model: db.Table,
            as: "table",
            attributes: ["tableNumber"],
            include: [
              {
                model: db.Hall,
                as: "hall",
                attributes: ["name"],
              },
            ],
          },
        ],
      });
      if (!order) return resolve({ err: 1, msg: "Đơn hàng không tồn tại!" });

      order.status = status;
      if (status === "paid" && employeeID) {
        order.employeeID = employeeID;
        await db.Table.update(
          { status: "Trống" },
          { where: { id: order.tableID } }
        );

        // Cập nhật bảng BestSeller
        const orderDetails = await db.OrderDetail.findAll({
          where: { orderID },
          attributes: ["foodID", "quantity"],
        });
        console.log(orderDetails)
        for (const item of orderDetails) {
          const { foodID, quantity } = item;
          console.log(`🛠 Debug - FoodID: ${foodID}, Quantity: ${quantity}`);

          const existingBestSeller = await db.BestSeller.findOne({
            where: { foodID },
          });

          if (!existingBestSeller) {
            await db.BestSeller.create({
              foodID,
              orderCount: quantity,
            });
          } else {
            existingBestSeller.orderCount += quantity;
            await existingBestSeller.save();
          }
        }

        // Thêm vào bảng doanh thu
        const orderDate = new Date(order.updatedAt);
        const month = orderDate.getMonth() + 1; // Lấy tháng (1-12)
        const year = orderDate.getFullYear(); // Lấy năm
        const startOfMonth = new Date(year, month - 1, 1);
        const week = Math.ceil(
          (orderDate.getDate() - startOfMonth.getDate() + 1) / 7
        ); // Xác định tuần

        // Kiểm tra xem order đã tồn tại trong revenues chưa
        const existingRevenue = await db.Revenue.findOne({
          where: { orderID },
        });

        if (!existingRevenue) {
          await db.Revenue.create({
            orderID,
            date: orderDate,
            week,
            month,
            year,
            total: parseFloat(order.total),
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
          // Nếu đã có, cập nhật lại doanh thu
          existingRevenue.total = parseFloat(order.total);
          existingRevenue.updatedAt = new Date();
          await existingRevenue.save();
        }
      }

      await order.save();

      //xử lý thông báo nhân viên gửi đơn cho bếp
      const tableNumber = order.table?.tableNumber || "N/A";
      const hallName = order.table?.hall?.name || "N/A";

      switch (status) {
        case "preparing":
          await sendNotification(
            "chef",
            "Nhân viên gửi đơn",
            `Bàn ${tableNumber} - ${hallName} vừa gọi món, vui lòng chuẩn bị.`
          );
          break;
        case "paying":
          await sendNotification(
            "employee",
            "Nhân viên gửi đơn",
            `Bàn ${tableNumber} - ${hallName} đang gọi thanh toán!`
          );
        default:
          break;
      }

      resolve({
        err: 0,
        msg: "Cập nhật trạng thái đơn hàng thành công!",
        data: order,
      });
    } catch (error) {
      reject(error);
    }
  });

//get all
export const getAllOrderService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Order.findAll({
        attributes: ["id", "voucherID", "status", "total", "updatedAt"],
        include: [
          {
            model: db.Customer,
            as: "customer",
            attributes: ["id", "customerName", "customerPhone"],
          },
          {
            model: db.Table,
            as: "table",
            attributes: ["id", "tableNumber"],
            include: [
              {
                model: db.Hall,
                as: "hall",
                attributes: ["name"],
              },
            ],
          },
          {
            model: db.OrderDetail,
            as: "orderDetails",
            attributes: ["id", "quantity", "totalPrice", "status"],
            include: [
              {
                model: db.Food,
                as: "food",
                attributes: ["id", "name", "price", "foodImg"],
              },
            ],
          },
        ],
      });
      const currentDate = new Date(); // Ngày hiện tại
      const currentMonth = currentDate.getMonth() + 1; // Tháng hiện tại (1-12)
      const currentYear = currentDate.getFullYear(); // Năm hiện tại
      const startOfMonth = new Date(currentYear, currentMonth - 1, 1); // Ngày đầu tháng
      const weekNumber = Math.ceil(
        (currentDate.getDate() - startOfMonth.getDate() + 1) / 7
      ); // Tuần hiện tại trong tháng

      //tính doanh thu
      const totalRevenue = response
        .filter((order) => order.status === "paid")
        .reduce((acc, order) => acc + parseFloat(order.total || 0), 0);

      //tính theo tháng
      const monthlyRevenue = response
        .filter(
          (order) =>
            order.status === "paid" &&
            new Date(order.updatedAt).getMonth() + 1 === currentMonth &&
            new Date(order.updatedAt).getFullYear() === currentYear
        )
        .reduce((acc, order) => acc + parseFloat(order.total || 0), 0);

      //tính theo năm
      const yearlyRevenue = response
        .filter(
          (order) =>
            order.status === "paid" &&
            new Date(order.updatedAt).getFullYear() === currentYear
        )
        .reduce((acc, order) => acc + parseFloat(order.total || 0), 0);

      //tính doanh thu theo tuần
      const weeklyRevenue = response
        .filter((order) => {
          const orderDate = new Date(order.updatedAt);
          const orderWeekNumber = Math.ceil(
            (orderDate.getDate() - startOfMonth.getDate() + 1) / 7
          );
          return order.status === "paid" && orderWeekNumber === weekNumber;
        })
        .reduce((acc, order) => acc + parseFloat(order.total || 0), 0);

      resolve({
        err: 0,
        msg: "Lấy danh sách order thành công!",
        data: response,
        totalRevenue: totalRevenue.toLocaleString("vi-VN"),
        monthlyRevenue: monthlyRevenue.toLocaleString("vi-VN"),
        yearlyRevenue: yearlyRevenue.toLocaleString("vi-VN"),
        weeklyRevenue: weeklyRevenue.toLocaleString("vi-VN"),
        count: response.length,
      });
    } catch (error) {
      reject(error);
    }
  });
