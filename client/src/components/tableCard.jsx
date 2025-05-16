import React from "react";
import { CiTrash } from "react-icons/ci";
import { FiDownload } from "react-icons/fi"; 

const TableCard = ({ tableNumber, peopleCount, status, onClick, onDelete, qrCode }) => {
    const bgColor = status === "Trống" ? "bg-greenDark" : "bg-redDark";

    const handleDownload = (e) => {
        e.stopPropagation(); 
        const link = document.createElement("a");
        link.href = qrCode;
        link.download = `QR_Ban_${tableNumber}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            className={`relative w-40 h-52 p-3 ${bgColor} rounded-lg flex flex-col items-center justify-center text-white cursor-pointer`}
            onClick={onClick}
        >
            <div className="w-full flex items-center justify-between">
                <h1 className="text-lg text-white font-semibold">Bàn {tableNumber}</h1>
                <div
                    className="text-white hover:text-primary cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <CiTrash className="text-2xl" />
                </div>
            </div>

            {/* Mã QR */}
            <img src={qrCode} alt={`QR Bàn ${tableNumber}`} className="w-[100px] h-[80px] object-contain mb-2 mt-2" />

            {/* Nút tải mã QR */}
            <button
                onClick={handleDownload}
                className="mt-2 px-2 py-1 bg-white text-primary text-sm flex items-center rounded-md hover:bg-gray-200"
            >
                <FiDownload className="mr-1" /> Tải mã Qr
            </button>

            <h1 className="text-lg text-white font-semibold mt-1">Số lượng: {peopleCount}</h1>
        </div>
    );
};

export default TableCard;
