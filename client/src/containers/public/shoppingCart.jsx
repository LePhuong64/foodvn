import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { IoAdd, IoRemove } from "react-icons/io5";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllCart, deleteCart, getCart, getOrder, updateCart, updateOrder } from "../../store/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { path } from "../../ultils/constant";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { Tooltip } from "react-tooltip";

const ShoppingCart = () => {

  const { cartItems } = useSelector((state) => state.cart || []);
  const { id } = useSelector((state) => state.auth);
  const { order = [] } = useSelector((state) => state.order || { order: [] });

  const activeOrder = order.find(o => o.status === "pending");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  //get all
  useEffect(() => {
    if (id) {
      dispatch(getCart(id));
      dispatch(getOrder(id));
    }
  }, [id, dispatch, order]);

  //thay đổi số lượng món
  const handleQuantityChange = (foodID, delta) => {

    const item = cartItems.find((item) => item.foodID === foodID);

    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      const payload = {
        customerID: id,
        foodID,
        quantity: newQuantity,
      };
      dispatch(updateCart(payload));
    }
  };

  //xóa món khỏi giỏ hàng
  const handleRemoveItem = (foodID) => {
    if (!id) return;

    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Món ăn này sẽ bị xóa khỏi giỏ hàng!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCart(id, foodID));
        Swal.fire("Đã xóa!", "Món ăn đã bị xóa khỏi giỏ hàng.", "success");
      }
    });
  };

  //tính tiền
  const subtotal = Array.isArray(cartItems) ?
    cartItems.reduce((sum, item) => sum + (Number(item.food?.price) || 0) * (item.quantity || 0), 0)
    : 0;

  //gọi món
  const orderFood = () => {
    if (!activeOrder) {
      Swal.fire({
        title: "Thông báo!",
        text: "Không tìm thấy đơn hàng đang chờ!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    dispatch(updateOrder(id, activeOrder.id))
      .then(() => {
        Swal.fire({
          title: "Thành công!",
          text: "Gọi món thành công!",
          icon: "success",
          confirmButtonText: "Theo dõi món ăn",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/${path.ORDER}`);
            dispatch(getCart(id));
          }
        });
      })
      .catch((error) => {
        console.log("Lỗi khi gọi món:", error);
        Swal.fire({
          title: "Thông báo!",
          text: error.message || "Đã xảy ra lỗi trong quá trình gọi món",
          icon: "warning",
          confirmButtonText: "Thử lại",
        });
        dispatch(getCart(id));
      });
  };

  // Phân trang
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCards = cartItems.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  //xóa toàn bộ
  const handleClearCart = () => {
    if (!id) return;

    Swal.fire({
      title: "Bạn có chắc chắn?",
      text: "Tất cả món ăn trong giỏ hàng sẽ bị xóa!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa tất cả",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAllCart(id)).then(() => {
          Swal.fire("Đã xóa!", "Giỏ hàng của bạn đã trống.", "success");
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl text-primary font-bold text-center mb-4 mt-4">Giỏ hàng</h1>
        {/* Nút Xóa toàn bộ giỏ hàng */}
        {cartItems.length > 0 && (
          <div className="text-right">
            <button
              onClick={handleClearCart}
              className="text-txtCard hover:text-redDark transition-all"
            >
              <FaTrashAlt size={22} />
              <span className="sr-only">Xóa toàn bộ giỏ hàng</span>
            </button>

            <Tooltip anchorSelect=".text-redDark" place="top" content="Xóa toàn bộ giỏ hàng" />
          </div>
        )}
        {currentCards.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-primary">
                <th className="border-b p-4">Món ăn</th>
                <th className="border-b p-4">Giá (VND)</th>
                <th className="border-b p-4">Số lượng</th>
                <th className="border-b p-4">Tổng (VND)</th>
                <th className="border-b p-4">Xóa</th>
              </tr>
            </thead>
            <tbody>
              {currentCards.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="p-4 flex items-center">
                    <img src={item.food.foodImg} alt={item.food.name} className="w-12 h-12 rounded mr-4" />
                    {item.food.name}
                  </td>
                  <td className="p-4">{item.food.price ? Number(item.food.price).toLocaleString("vi-VN") : "0"}</td>
                  <td className="p-4 flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.foodID, -1)}
                      className="p-2 bg-gray-200 hover:bg-primary rounded-full hover:text-white"
                    >
                      <IoRemove />
                    </button>
                    <span className="mx-3">{item.quantity || 0}</span>
                    <button
                      onClick={() => handleQuantityChange(item.foodID, 1)}
                      className="p-2 bg-gray-200 hover:bg-primary rounded-full hover:text-white"
                    >
                      <IoAdd />
                    </button>
                  </td>

                  <td className="p-4">{item.food.price && item.quantity ? (Number(item.food.price) * item.quantity).toLocaleString("vi-VN") : "0"}</td>
                  <td className="p-4">
                    <button
                      className="text-txtCard hover:text-primary"
                      onClick={() => handleRemoveItem(item.foodID)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-lg text-gray-600">Giỏ hàng của bạn đang trống.</p>
        )}
        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"
                }`}
            >
              <GrFormPreviousLink size={24} />
            </button>

            <span className="text-lg font-semibold">
              Trang {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"
                }`}
            >
              <GrFormNextLink size={24} />
            </button>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-6 text-right text-xl font-bold text-txtCard">
            <div className="flex justify-between mb-2">
              <span>Tổng đơn</span>
              <span className="mr-8">{subtotal.toLocaleString("vi-VN")} VND</span>
            </div>
            {/* Nút Gọi món */}
            <motion.button
              className="relative overflow-hidden border-2 border-primary text-primary rounded-lg font-semibold text-lg transition-all duration-300 group mt-4 px-6 py-2"
              onClick={orderFood}
            >
              <span className="relative z-10 group-hover:text-txtCard">Gọi món ngay</span>
              <span className="absolute inset-0 bg-gradientPrimary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;