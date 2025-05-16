import React from 'react'

const OrderCard = ({ order, customerName, customerPhone }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold text-primary flex justify-between items-center">
                Đơn hàng #{order.id} - {" "}
                {new Date(order.updatedAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })}
                <span className="text-primary px-4 py-2 font-medium text-xl">
                    {customerName} - {customerPhone}
                </span>
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
                    {order.orderDetails.map((item) => (
                        <tr key={item.food.id} className="hover:bg-gray-100">
                            <td className="p-4 flex items-center">
                                <img src={item.food.foodImg} alt={item.food.name} className="w-12 h-12 rounded mr-4" />
                                {item.food.name}
                            </td>
                            <td className="p-4 text-center">{item.quantity}</td>
                            <td className="p-4 text-center">
                                {item.food.price ? Number(item.food.price).toLocaleString("vi-VN") : "0"}
                            </td>
                            <td className="p-4 text-center">
                                {item.totalPrice ? Number(item.totalPrice).toLocaleString("vi-VN") : "0"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="text-right mt-4 text-lg font-bold text-primary">
                Tổng tiền: {order.total ? Number(order.total).toLocaleString("vi-VN") : "0"} VND
            </div>
        </div>
    );
};

export default OrderCard