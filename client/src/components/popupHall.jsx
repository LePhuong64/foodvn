import React from "react";
import { IoMdClose } from "react-icons/io";

const PopupHall = ({ isAdd, name, onClose, onEdit, onSubmit }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm relative">
                <h2 className="text-xl font-medium mb-4">
                    {isAdd ? "Thêm sảnh mới" : "Chỉnh sửa tên sảnh"}
                </h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-primary hover:opacity-60 focus:outline-none"
                >
                    <IoMdClose className="text-2xl text-primary" />
                </button>

                {/* Form thêm hoặc chỉnh sửa tên sảnh */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const updatedHallName = e.target.hallName.value;
                        if (isAdd) {
                            onSubmit(updatedHallName);
                        } else {
                            onEdit(updatedHallName);
                        }
                    }}
                    className="text-left"
                >
                    <div className="mb-4">
                        <label htmlFor="hallName" className="block font-medium mb-1">
                            Tên sảnh
                        </label>
                        <input
                            id="hallName"
                            name="hallName"
                            type="text"
                            placeholder="Nhập tên sảnh"
                            defaultValue={isAdd ? "" : name}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 focus:outline-none"
                    >
                        {isAdd ? "Thêm sảnh" : "Lưu Thay Đổi"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupHall;
