import React from "react";
import { IoMdClose } from "react-icons/io";

const PopupCategory = ({ isAdd, category, onClose, onSubmit, onChange }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-xl shadow-2xl w-96 relative">
                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition"
                >
                    <IoMdClose className="text-2xl text-gray-600" />
                </button>

                {/* Tiêu đề */}
                <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                    {isAdd ? "Thêm loại thức ăn" : "Chỉnh sửa tên loại"}
                </h2>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Input */}
                    <div>
                        <label htmlFor="categoryName" className="block font-medium text-gray-700 mb-1">
                            Tên loại
                        </label>
                        <input
                            id="categoryName"
                            type="text"
                            name="name"
                            value={category}
                            onChange={onChange}
                            placeholder="Nhập tên loại"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary/50"
                        />
                    </div>

                    {/* Nút xác nhận */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
                    >
                        {isAdd ? "Thêm" : "Lưu thay đổi"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupCategory;
