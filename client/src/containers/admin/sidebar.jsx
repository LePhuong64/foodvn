import React from "react";
import { Link } from "react-router-dom";
import { path } from '../../ultils/constant';

const Sidebar = () => {
    return (
        <div className="bg-gray-100 w-64 h-screen p-5">
            <Link to={`/admin`}>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/img/logo.png`}
                    alt="logo"
                    className="w-20 h-auto ml-8 mb-8"
                />
            </Link>
            <ul className="space-y-10">
                <li>
                    <Link
                         to={`/admin`}
                        className="text-gray-600 text-xl font-medium hover:text-yellow-500"
                    >
                        🏠 Trang chủ
                    </Link>
                </li>
                <li>
                    <Link
                         to={`/admin/${path.ADMIN_ORDER}`}
                        className="text-gray-600 text-xl font-medium hover:text-yellow-500"
                    >
                        📋 Hóa đơn
                    </Link>
                </li>
                <li>
                    <Link
                         to={`/admin/${path.ADMIN_FOOD}`}
                        className="text-gray-600 text-xl font-medium hover:text-yellow-500"
                    >
                        🍽️ Thực đơn
                    </Link>
                </li>
                <li>
                    <Link
                         to={`/admin/${path.ADMIN_TABLE}`}
                        className="text-gray-600 text-xl font-medium hover:text-yellow-500"
                    >
                        🪑 Quản lý bàn
                    </Link>
                </li>
                <li>
                    <Link
                         to={`/admin/${path.ADMIN_CUSTOMER}`}
                        className="text-gray-600 text-xl font-medium hover:text-yellow-500"
                    >
                        👥 Khách hàng
                    </Link>
                </li>
                <li>
                    <Link
                         to={`/admin/${path.ADMIN_EMPLOYEE}`}
                        className="text-gray-600 text-xl font-medium hover:text-yellow-500"
                    >
                        🧑‍💼 Nhân viên order
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/admin/${path.ADMIN_CHEF}`}
                        className="text-gray-600 text-xl font-medium hover:text-yellow-500"
                    >
                        🍳 Nhân viên bếp
                    </Link>
                </li>
                <li>
                    <Link
                        to={`/`}
                        className="text-gray-600 text-xl font-medium hover:text-yellow-500"
                    >
                        🌐 Web khách hàng
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
