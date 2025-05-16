import React from "react";
import { CiTrash } from "react-icons/ci";   // CiShoppingCart

const FoodCard = ({ name, price, image, onDelete, onClick }) => {
    //đổi định dạng tiền
    const numericPrice = Number(price);
    const formattedPrice = numericPrice % 1 === 0
        ? `${numericPrice.toLocaleString("vi-VN")} VND`
        : numericPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

    return (
        <div
            className="w-full bg-gradientPrimary shadow-md rounded-lg overflow-hidden cursor-pointer relative"
            onClick={onClick}
        >
            <img
                src={image}
                alt={name}
                className="w-full h-64 object-cover"
            />

            <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-txtCard">{name}</h3>
                <p className="text-txtCard">{formattedPrice}</p>
            </div>
            <button
                className="text-txtCard hover:text-redDark absolute bottom-2 right-2"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
            >
                <CiTrash size={24} />
            </button>
        </div>
    );
};

export default FoodCard;
