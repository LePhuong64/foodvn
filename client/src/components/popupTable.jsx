import React from "react";
import { IoMdClose } from "react-icons/io";

const PopupTable = ({ isAdd,numberTable, peopleCount, onClose, onEdit, onSubmit }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm relative">
                <h2 className="text-xl font-medium mb-4">
                    {isAdd ? "Thêm Bàn Mới" : `Chỉnh Sửa Bàn ${numberTable}`}
                </h2>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-primary hover:opacity-60 focus:outline-none"
                >
                    <IoMdClose className="text-2xl text-primary" />
                </button>

                {/* Form chỉnh sửa hoặc thêm bàn */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const updatedTableNumber = e.target.numberTable.value;
                        const updatedPeopleCount = e.target.peopleCount.value;
                        if (isAdd) {
                            onSubmit(updatedTableNumber, updatedPeopleCount);
                        } else {
                            onEdit(updatedTableNumber, updatedPeopleCount);
                        }
                    }}
                    className="text-left"
                >
                    <div className="mb-4">
                        <label htmlFor="numberTable" className="block font-medium mb-1">
                            Số bàn
                        </label>
                        <input
                            id="numberTable"
                            name="numberTable"
                            type="number"
                            min="1"
                            placeholder="Nhập số bàn"
                            defaultValue={isAdd ? "" : numberTable}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="peopleCount" className="block font-medium mb-1">
                            Số người
                        </label>
                        <input
                            id="peopleCount"
                            name="peopleCount"
                            type="number"
                            min="1"
                            placeholder="Nhập số người"
                            defaultValue={isAdd ? "" : peopleCount}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 focus:outline-none"
                    >
                        {isAdd ? "Thêm" : "Lưu thay đổi"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupTable;
