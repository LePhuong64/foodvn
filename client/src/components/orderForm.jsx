import React from "react";
import { IoMdClose } from "react-icons/io";

const OrderForm = ({ customerName, numberTable, setNumberTable, onClose, onSubmit, onScan }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg text-center shadow-lg max-w-sm relative">
        <h2 className="text-xl text-primary font-medium mb-4">Gọi món</h2>
        <button onClick={onClose} className="absolute top-2 right-2 text-primary hover:opacity-60 focus:outline-none">
          <IoMdClose className="text-2xl text-primary" />
        </button>

        <form onSubmit={onSubmit} className="text-left">
          <div className="mb-4">
            <label className="block font-medium mb-1">Tên khách hàng</label>
            <input type="text" value={customerName} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Số bàn</label>
            <div className="flex">
              <input type="number" min="1" placeholder="Nhập hoặc quét QR..." value={numberTable} onChange={(e) => setNumberTable(e.target.value)} required className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" />
              <button type="button" onClick={onScan} className="ml-2 bg-primary text-white px-4 py-2 rounded-lg">📷 Quét QR</button>
            </div>
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-primary text-white rounded-lg">Gọi món</button>
        </form>
        <div id="qr-reader" className="mt-4"></div>
      </div>
    </div>
  );
};

export default OrderForm;
