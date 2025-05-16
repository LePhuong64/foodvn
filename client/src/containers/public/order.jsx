import React, { useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useDispatch, useSelector } from "react-redux";
import { getOrder, updateOrderStatus } from "../../store/actions";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Order = () => {
  const { order = [] } = useSelector((state) => state.order || { order: [] });
  const { id } = useSelector((state) => state.auth);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getOrder(id));
    }
  }, [id, dispatch,order]);

  // Lọc đơn hàng theo trạng thái
  const pendingOrder = order?.find(o => o.status === "pending" || o.status === "preparing");
  const servedOrder = order?.find(order =>
    order.status === "preparing" && 
    order.orderDetails.some(detail => detail.status === "served")
  );
  const paidOrders = Array.isArray(order) ? order.filter(o => o.status === "paid") : [];

  //thanh toán
  const payment = async (orderId) => {
    Swal.fire({
      title: "Xác nhận thanh toán",
      text: "Bạn có chắc chắn muốn gọi thanh toán không?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateOrderStatus({ orderID: orderId, status: "paying" }));
        Swal.fire("Đã gửi yêu cầu!", "Hóa đơn của bạn đang được xử lý", "success");
      }
    });
  }

  //đánh giá món ăn 
  const handleReview = async (orderData) => {
    navigate("/review", { state: { order: orderData } });
  }
  return (
    <div className="w-full max-w-6xl mx-auto mt-20 p-4">
      <h1 className="text-3xl text-primary font-bold text-center mb-6">
        Gọi món
      </h1>

      <Tabs.Root defaultValue="followFood">
        <Tabs.List className="flex border-b bg-gray-100 rounded-md overflow-hidden">
          <Tabs.Trigger
            value="followFood"
            className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:rounded-t-md"
          >
            Theo dõi món ăn
          </Tabs.Trigger>
          <Tabs.Trigger
            value="bill"
            className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:rounded-t-md"
          >
            Hóa đơn
          </Tabs.Trigger>
          <Tabs.Trigger
            value="foodHistory"
            className="flex-1 px-4 py-3 text-base font-medium text-center bg-white hover:bg-gray-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:rounded-t-md"
          >
            Xem lịch sử hóa đơn
          </Tabs.Trigger>
        </Tabs.List>

        {/* Tab Theo dõi món ăn */}
        <Tabs.Content value="followFood" className="p-4 bg-white rounded-b-md shadow">
          {pendingOrder ? (
            pendingOrder.orderDetails?.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-primary">
                    <th className="border-b p-4">Món ăn</th>
                    <th className="border-b p-4 text-center">Số lượng</th>
                    <th className="border-b p-4 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrder.orderDetails.map((item) => (
                    <tr key={item.food.id} className="hover:bg-gray-100">
                      <td className="p-4 flex items-center">
                        <img src={item.food.foodImg} alt={item.food.name} className="w-12 h-12 rounded mr-4" />
                        {item.food.name}
                      </td>
                      <td className="p-4 text-center">{item.quantity}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 text-base border-2 rounded-lg ${item.status === "pending"
                          ? "text-primary border-primary"
                          : "text-greenDark border-greenDark"
                          }`}>
                          {item.status === "pending" ? "Món đang được chế biến" : "Món đã chế biến xong"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">Bạn chưa gọi món nào.</p>
            )
          ) : (
            <p className="text-center text-gray-500">Không có đơn hàng đang chờ xử lý.</p>
          )}
        </Tabs.Content>

        {/* Tab Hóa đơn */}
        <Tabs.Content value="bill" className="p-4 bg-white rounded-b-md shadow">
          {servedOrder ? (
            <div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-primary">
                    <th className="border-b p-4">Món ăn</th>
                    <th className="border-b p-4 text-center">Số lượng</th>
                    <th className="border-b p-4 text-center">Giá (VND)</th>
                    <th className="border-b p-4 text-center">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {servedOrder.orderDetails.map((item) => (
                    <tr key={item.food.id} className="hover:bg-gray-100">
                      <td className="p-4 flex items-center">
                        <img src={item.food.foodImg} alt={item.food.name} className="w-12 h-12 rounded mr-4" />
                        {item.food.name}
                      </td>
                      <td className="p-4 text-center">{item.quantity}</td>
                      <td className="p-4 text-center">{Number(item.food.price).toLocaleString("vi-VN")}</td>
                      <td className="p-4 text-center">{Number(item.totalPrice).toLocaleString("vi-VN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="text-right mt-4 text-xl font-bold text-primary">
                Tổng tiền: {Number(servedOrder.total).toLocaleString("vi-VN")} VND
              </div>

              <div className="text-right mt-4">
                <motion.button
                  onClick={() => payment(servedOrder.id)}
                  className="border-2 border-primary text-primary rounded-lg px-6 py-2 font-semibold text-lg transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  Thanh toán
                </motion.button>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">Chưa có hóa đơn nào.</p>
          )}
        </Tabs.Content>

        {/* Tab Lịch sử hóa đơn */}
        <Tabs.Content value="foodHistory" className="p-4 bg-white rounded-b-md shadow">
          {paidOrders?.length > 0 ? (
            <div className="space-y-6">
              {paidOrders.map((paidOrder) => (
                <div key={paidOrder.id} className="border rounded-lg p-4 shadow-md">
                  <h2 className="text-xl font-bold text-primary flex justify-between items-center">
                    Hóa đơn #{paidOrder.id} -{" "}
                    {new Date(paidOrder.updatedAt).toLocaleString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                    <button
                      onClick={() => handleReview(paidOrder)}
                      className="border border-primary text-primary rounded-lg px-4 py-2 font-medium text-sm hover:bg-primary hover:text-white transition-all"
                    >
                      Đánh giá
                    </button>
                  </h2>
                  <table className="w-full text-left border-collapse mt-3">
                    <thead>
                      <tr className="text-primary">
                        <th className="border-b p-4">Món ăn</th>
                        <th className="border-b p-4 text-center">Số lượng</th>
                        <th className="border-b p-4 text-center">Giá (VND)</th>
                        <th className="border-b p-4 text-center">Tổng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paidOrder.orderDetails.map((item) => (
                        <tr key={item.food.id} className="hover:bg-gray-100">
                          <td className="p-4 flex items-center">
                            <img src={item.food.foodImg} alt={item.food.name} className="w-12 h-12 rounded mr-4" />
                            {item.food.name}
                          </td>
                          <td className="p-4 text-center">{item.quantity}</td>
                          <td className="p-4 text-center">{Number(item.food.price).toLocaleString("vi-VN")}</td>
                          <td className="p-4 text-center">{Number(item.totalPrice).toLocaleString("vi-VN")}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="text-right mt-4 text-lg font-bold text-primary">
                    Tổng tiền: {Number(paidOrder.total).toLocaleString("vi-VN")} VND
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Chưa có hóa đơn nào trong lịch sử.</p>
          )}
        </Tabs.Content>

      </Tabs.Root>
    </div>
  );
};

export default Order;
