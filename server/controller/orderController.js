import * as orderService from "../services/order";

//create order
export const createOrderController = async (req, res) => {
  const { customerID, tableNumber } = req.body;
  try {
    if (!customerID || !tableNumber) {
      return res
        .status(400)
        .json({ err: 1, msg: "Vui lòng nhập đầy đủ thông tin!" });
    }
    const response = await orderService.createOrderService(req.body);
    return res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at create order:"]: error.message });
  }
};
//create order detail
// export const createOrderDetailController = async (req, res) => {
//   const { orderID, foodID, quantity } = req.body;
//   try {
//     if (!orderID || !foodID || !quantity) {
//       return res
//         .status(400)
//         .json({ err: 1, msg: "Vui lòng nhập đầy đủ thông tin!" });
//     }
//     const response = await orderService.createOrderDetailService(req.body);
//     return res.status(201).json(response);
//   } catch (error) {
//     res.status(500).json({ ["Fail at create order detail:"]: error.message });
//   }
// };
//get order
export const getOrderController = async (req, res) => {
  const cutomerID = req.params.id;
  try {
    const response = await orderService.getOrderService(cutomerID);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at get order:"]: error.message });
  }
};
//update order
export const updateOrderController = async (req, res) => {
  const { customerID,orderID } = req.body;
  try {
    if (!customerID || !orderID) {
      return res.status(400).json({ err: 1, msg: "Không có thông tin!" });
    }

    const response = await orderService.updateOrderService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at update order:"]: error.message });
  }
};
//update food status
export const updateFoodSatus = async (req, res) => {
  const { status } = req.body;
  try {
    if (!status) {
      return res.status(400).json({ err: 1, msg: "Không có thông tin để cập nhật!" });
    }

    const response = await orderService.updateFoodStatusService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at update status:"]: error.message });
  }
};
//update order status
export const updateOrderSatus = async (req, res) => {
  const { status } = req.body;
  try {
    if (!status) {
      return res.status(400).json({ err: 1, msg: "Không có thông tin để cập nhật!" });
    }

    const response = await orderService.updateOrderStatusService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ ["Fail at update status:"]: error.message });
  }
};
//get all
export const getAllOrderController = async (req, res) => {
  try {
    const categories = await orderService.getAllOrderService();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ ["Fail at get order:"]: error.message });
  }
};