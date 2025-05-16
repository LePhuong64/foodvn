import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../components";
import * as action from "../../store/actions";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const Customer = () => {
    const { customers } = useSelector((state) => state.customer);
    const { order } = useSelector((state) => state.order);

    const [searchTerm, setSearchTerm] = useState("");
    const [orderCount, setOrderCount] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const dispatch = useDispatch();

    //call api get all
    useEffect(() => {
        dispatch(action.getAllCustomer());
        dispatch(action.getAllOrder())
    }, [dispatch]);

    useEffect(() => {
        if (customers.length > 0 && order.length > 0) {
            const countMap = {};
            order.forEach(order => {
                const customerID = order.customer?.id;
                if (customerID) {
                    countMap[customerID] = (countMap[customerID] || 0) + 1;
                }
            });
            setOrderCount(countMap);
        }
    }, [customers, order]);

    const sortedCustomers = [...customers].sort((a, b) => {
        return (orderCount[b.id] || 0) - (orderCount[a.id] || 0);
    });

    const filteredCustomers = sortedCustomers.filter((customer) =>
        customer.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.customerPhone.includes(searchTerm)
    );
    //phân trang
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="w-full p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl text-primary font-medium">Thông tin khách hàng</h1>
                <div className="ml-auto">
                    <Search
                        placeholder="Tìm theo tên hoặc số điện thoại..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
                        }}
                    />
                </div>
            </div>
            <table className="table-auto w-full bg-white shadow-md rounded">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Tên</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Số điện thoại</th>
                        <th className="px-4 py-2">Số lần đến nhà hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCustomers.length > 0 ? (
                        paginatedCustomers.map((customer) => (
                            <tr key={customer.id} className="text-center border-b">
                                <td className="px-4 py-2">{customer.id}</td>
                                <td className="px-4 py-2">{customer.customerName}</td>
                                <td className="px-4 py-2">{customer.customerEmail}</td>
                                <td className="px-4 py-2">{customer.customerPhone}</td>
                                <td className="px-4 py-2">{orderCount[customer.id] || 0}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">
                                Không có dữ liệu khách hàng.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-center items-center mt-4">
                <button
                    className={`px-3 py-1 rounded-full mx-1 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <GrFormPreviousLink size={24} />
                </button>
                <span className="mx-2 text-primary">Trang {currentPage} / {totalPages}</span>
                <button
                    className={`px-3 py-1 mx-1 rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <GrFormNextLink size={24} />
                </button>
            </div>
        </div>
    )
}

export default Customer
