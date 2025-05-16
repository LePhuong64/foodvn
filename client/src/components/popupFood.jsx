import React from "react";
import { IoMdClose } from "react-icons/io";

const PopupFood = ({ isAdd, category, name, price, description, onClose, onSubmit, onChange, onImageChange }) => {
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
                    {isAdd ? `Thêm món ăn cho ${category}` : `Chỉnh sửa thông tin`}
                </h2>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Tên món ăn */}
                    <div>
                        <label htmlFor="foodName" className="block font-medium text-gray-700 mb-1">
                            Tên món ăn
                        </label>
                        <input
                            id="foodName"
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Nhập tên món ăn"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary/50"
                        />
                    </div>

                    {/* Giá */}
                    <div>
                        <label htmlFor="foodPrice" className="block font-medium text-gray-700 mb-1">
                            Giá (VNĐ)
                        </label>
                        <input
                            id="foodPrice"
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => {
                                if (e.target.value >= 0) {
                                    onChange(e);
                                }
                            }}
                            placeholder="Nhập giá món ăn"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary/50"
                        />
                    </div>

                    {/* Mô tả */}
                    <div>
                        <label htmlFor="foodDescription" className="block font-medium text-gray-700 mb-1">
                            Mô tả
                        </label>
                        <input
                            id="foodDescription"
                            type="text"
                            name="description"
                            value={description}
                            onChange={onChange}
                            placeholder="Nhập mô tả"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary/50"
                        />
                    </div>

                    {/* Hình ảnh */}
                    <div>
                        <label htmlFor="foodImage" className="block font-medium text-gray-700 mb-1">
                            Hình ảnh
                        </label>
                        <input
                            id="foodImage"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={onImageChange}
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

export default PopupFood;
