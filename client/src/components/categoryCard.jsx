import { CiTrash, CiEdit } from "react-icons/ci";
import React from "react";

const CategoryCard = ({ category, onDelete, onEdit,onClick }) => {
    return (
        <div className="w-[250px] h-[100px] relative bg-gradientPrimary rounded-[10px] flex items-center justify-center" onClick={onClick}>
            <p className="text-center text-txtCard font-bold text-[24px]">{category}</p>
            <button className="absolute top-2 right-2 text-txtCard hover:text-red-500 transition">
                <CiTrash
                    size={24}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                />
            </button>
            <button className="absolute top-2 left-2 text-txtCard hover:text-red-500 transition">
                <CiEdit
                    size={24}
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                    }}
                />
            </button>
        </div>
    )
}

export default CategoryCard;