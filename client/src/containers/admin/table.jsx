import React, { useState, useEffect } from "react";
import { MdAddBox } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { PiTrashLight } from "react-icons/pi";
import { PopupHall, PopupTable, TableCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";

import Swal from 'sweetalert2'
import { createHall, createTable, deleteHall, deleteTable, getAllHall, getAllTable, updateHall, updateTable } from "../../store/actions";

const Table = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
    const [isHallPopupVisible, setIsHallPopupVisible] = useState(false);
    const [isEditHallPopupVisible, setIsEditHallPopupVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const [selectedHall, setSelectedHall] = useState(null);
    const [activeHall, setActiveHall] = useState(null);


    const dispatch = useDispatch();
    const { tables, halls } = useSelector((state) => state.table);

    //phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const tablesPerPage = 8; // Số bàn trên mỗi trang
    const filteredTables = tables.filter((table) => table.hallID === activeHall);
    const totalPages = Math.ceil(filteredTables.length / tablesPerPage);

    const indexOfLastTable = currentPage * tablesPerPage;
    const indexOfFirstTable = indexOfLastTable - tablesPerPage;
    const currentTables = filteredTables
        .sort((a, b) => a.tableNumber - b.tableNumber) 
    .slice(indexOfFirstTable, indexOfLastTable);;
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Get all table
    useEffect(() => {
        dispatch(getAllTable());
        dispatch(getAllHall());
    }, [dispatch, tables]);

    //xử lý tab
    useEffect(() => {
        console.log("Updated activeHall:", activeHall);
    }, [activeHall]);

    //xử lý popup sảnh
    const openHallPopup = () => {
        setIsHallPopupVisible(true);
    };
    const closeHallPopup = () => {
        setIsHallPopupVisible(false);
    };
    const openEditHallPopup = (hall) => {
        setSelectedHall(hall);
        setIsEditHallPopupVisible(true);
    };
    //xử lý popup bàn
    // popup sửa
    const openPopup = (table) => {
        setSelectedTable({
            id: table.id,
            tableNumber: table.tableNumber,
            peopleCount: table.maxQuantity,
        });
        setIsPopupVisible(true);
    };
    // Close popup
    const closePopup = () => {
        setIsPopupVisible(false);
        setSelectedTable(null);
    };
    // Popup thêm
    const openAddPopup = () => {
        setIsAddPopupVisible(true);
    };
    const closeAddPopup = () => {
        setIsAddPopupVisible(false);
    };

    // Edit table
    const handleUpdateTable = (updatedTableNumber, updatedPeopleCount) => {
        const payload = {
            tableNumber: updatedTableNumber,
            maxQuantity: updatedPeopleCount,
        };
        dispatch(updateTable(selectedTable.id, payload))
            .then(() => {
                Swal.fire("Thành công!", "Cập nhật bàn thành công", "success");
            })
            .catch((error) => {
                Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình sửa", "error");
            });
        closePopup();
    };

    // Delete table
    const handleDeleteTable = (id) => {
        Swal.fire({
            title: "Xác nhận",
            text: "Bạn có chắc muốn xóa bàn không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteTable(id))
                    .then(() => {
                        Swal.fire("Thành công!", "Đã xóa bàn thành công.", "success");
                    })
                    .catch((error) => {
                        Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình xóa", "error");
                    });
            }
        });
    };

    // Add table
    const addTable = (numberTable, peopleCount, hallID) => {

        const hall = halls.find((h) => h.id === hallID);
        const hallName = hall ? hall.name : "Không có sảnh!";

        const payload = {
            tableNumber: numberTable,
            maxQuantity: peopleCount,
            hallName: hallName,
            status: "Trống",
        };
        dispatch(createTable(payload))
            .then(() => {
                Swal.fire("Thành công!", "Thêm bàn thành công", "success");
            })
            .catch((error) => {
                Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình thêm", "error");
            });
        closeAddPopup();
    };
    //xử lý cho sảnh
    const handleAddHall = (hallName) => {
        const payload = {
            name: hallName,
        };
        dispatch(createHall(payload))
            .then(() => {
                Swal.fire("Thành công!", "Thêm sảnh thành công", "success");
            })
            .catch((error) => {
                Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình thêm", "error");
            });
        closeHallPopup();
    }

    const handleEditHall = (name) => {
        if (!selectedHall || !selectedHall.id) {
            console.error("Error: selectedHall is undefined!");
            return;
        }
        const payload = { name };
        dispatch(updateHall(selectedHall.id, payload))
            .then(() => {
                Swal.fire("Thành công!", "Cập nhật sảnh thành công", "success");
            })
            .catch((error) => {
                Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình sửa", "error");
            });

        closePopup();
    };

    const handleDeleteHall = (id) => {
        Swal.fire({
            title: "Xác nhận",
            text: "Bạn có chắc muốn xóa sảnh này không?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteHall(id))
                    .then(() => {
                        Swal.fire("Thành công!", "Đã xóa sảnh thành công.", "success");
                    })
                    .catch((error) => {
                        Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình xóa", "error");
                    });
            }
        });
    }

    return (
        <div className="w-full p-6 flex space-x-6">
            {/* DANH SÁCH SẢNH */}
            <div className="w-1/4 border-r pr-4">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-medium text-primary">Danh sách sảnh</h1>
                    <button onClick={openHallPopup} className="text-primary">
                        <MdAddBox size={24} />
                    </button>
                </div>
                <div className="flex flex-col space-y-2">
                    {halls.map((hall) => {
                        const isActive = activeHall === hall.id;
                        return (
                            <button
                                key={hall.id}
                                className={`relative flex items-center justify-between w-full p-3 text-lg font-medium rounded-lg 
                    ${isActive ? "bg-primary text-white" : "bg-gray-200 text-txtCard hover:bg-gray-300"}`}
                                onClick={() => { setActiveHall(hall.id); }}
                            >
                                {hall.name}
                                <div className="flex items-center space-x-2">
                                    <AiOutlineEdit
                                        size={25}
                                        className={`${isActive ? "text-white hover:text-txtCard" : "text-txtCard pointer-events-none"}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEditHallPopup(hall);
                                        }}
                                    />
                                    <PiTrashLight
                                        size={25}
                                        className={`${isActive ? "text-white hover:text-txtCard" : "text-txtCard pointer-events-none"}`}
                                        onClick={(e) => {
                                            if (!isActive) return;
                                            e.stopPropagation();
                                            handleDeleteHall(hall.id);
                                        }}
                                    />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* DANH SÁCH BÀN */}
            <div className="w-3/4">
                <div className="flex justify-between items-center mb-6 relative">
                    <h1 className="text-xl text-primary font-medium">Quản lý bàn</h1>
                    <button onClick={openAddPopup} className="absolute top-0 right-0 text-primary">
                        <MdAddBox size={30} />
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-7">
                    {currentTables.length > 0 ? (
                        currentTables.map((table) => (
                            <TableCard
                                key={table.id}
                                tableNumber={`${table.tableNumber}`}
                                peopleCount={table.maxQuantity}
                                status={table.status}
                                qrCode={table.qrCode}
                                onClick={() => openPopup(table)}
                                onDelete={() => handleDeleteTable(table.id)}
                            />
                        ))
                    ) : (
                        <div className="col-span-4 text-center text-gray-500">
                            Không có bàn nào.
                        </div>
                    )}
                </div>

                {/* Phân trang */}
                {totalPages > 1 && (
                    <div className="w-full flex justify-center mt-6">
                        <button
                            className="px-4 py-2 mx-1 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === i + 1 ? "bg-primary text-white" : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            className="px-4 py-2 mx-1 border rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
            <div>
                {/* Popup sửa */}
                {isPopupVisible && selectedTable && (
                    <PopupTable
                        isAdd={false}
                        numberTable={selectedTable.tableNumber}
                        peopleCount={selectedTable.peopleCount}
                        onClose={closePopup}
                        onEdit={handleUpdateTable}
                    />
                )}
                {/* Popup thêm */}
                {isAddPopupVisible && (
                    <PopupTable
                        isAdd={true}
                        onClose={closeAddPopup}
                        onSubmit={(numberTable, peopleCount) => addTable(numberTable, peopleCount, activeHall)}
                    />
                )}
                {/* popup thêm sảnh */}
                {isHallPopupVisible && (
                    <PopupHall
                        isAdd={true}
                        onClose={closeHallPopup}
                        onSubmit={handleAddHall}
                    />
                )}
                {/* popup sửa sảnh */}
                {isEditHallPopupVisible && selectedHall && (
                    <PopupHall
                        isAdd={false}
                        name={selectedHall.name}
                        onClose={() => setIsEditHallPopupVisible(false)}
                        onEdit={handleEditHall}
                    />
                )}
            </div>
        </div>

    );
};

export default Table;
