import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderCard, Search } from '../../components'
import { getAllOrder } from "../../store/actions";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";


const OrderAdmin = () => {
  const { order } = useSelector((state) => state.order) || { order: [] };
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrder())
  }, [dispatch]);

  const paidOrders = Array.isArray(order) ? order.filter((o) => o.status === "paid") : [];

  const filteredOrders = paidOrders.filter((o) =>
    o.customer?.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customer?.customerPhone?.toString().includes(searchTerm)
  );

  // Tính toán số trang
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Hàm chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-primary font-medium">Thông tin đơn hàng</h1>
        <div className="ml-auto">
          <Search
            placeholder="Tìm theo tên khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-6">
        {currentOrders.length > 0 ? (
          currentOrders.map((order) =>
            <OrderCard
              key={order.id}
              order={order}
              customerName={order.customer?.customerName}
              customerPhone={order.customer?.customerPhone}
            />)
        ) : (
          <p className="text-center text-gray-500">Chưa có đơn hàng nào.</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
            className={`px-3 py-1 rounded-full mx-1 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrFormPreviousLink size={24} />
          </button>
          <span className="mx-2 text-primary">Trang {currentPage} / {totalPages}</span>
          <button
            className={`px-3 py-1 mx-1 rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <GrFormNextLink size={24} />
          </button>
        </div>
      )}
    </div>

  )
}
export default OrderAdmin