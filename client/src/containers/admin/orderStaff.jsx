import React, { useState, useEffect } from "react";
import { EmployeeCard, PopupEmployee, Search } from "../../components";
import { MdAddBox } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createOrderStaff, deleteEmployee, getAllEmployee, updateEmployee } from "../../store/actions";
import Swal from 'sweetalert2'

const OrderEmployee = () => {
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newStaff, setNewStaff] = useState({ name: "", phone: "", gender: "", image: null });
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const { allStaff } = useSelector((state) => state.employee);

  //get all 
  useEffect(() => {
    dispatch(getAllEmployee());
  }, [dispatch]);

  // popup sửa
  const openPopup = (employee) => {
    setSelectedEmployee(employee);
    setNewStaff({
      name: employee.employeeName,
      phone: employee.employeePhone,
      gender: employee.employeeGender,
      image: employee.employeeImg,
    });
    setIsPopupVisible(true);
  };
  //close
  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedEmployee(null);
    setNewStaff({ name: "", phone: "", gender: "", image: null });
  };

  // popup thêm
  const openAddPopup = () => {
    setIsAddPopupVisible(true);
  };
  const closeAddPopup = () => {
    setIsAddPopupVisible(false);
    setNewStaff({ name: "", phone: "", gender: "", image: null });
  };

  //nhập dữ liệu
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setNewStaff((prevState) => ({
      ...prevState,
      [name]: type === "file" ? (files[0] || null) : value,
    }));
  };
  //xử lý chức năng thêm
  const addOrderStaff = () => {
    const payload = {
      name: newStaff.name,
      phone: newStaff.phone,
      image: newStaff.image || null,
      gender: newStaff.gender || "Chưa có",
    };

    dispatch(createOrderStaff(payload))
      .then(() => {
        Swal.fire("Thành công!", "Thêm nhân viên order thành công", "success");
        dispatch(getAllEmployee());
      })
      .catch((error) => {
        Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình thêm", "error");
        dispatch(getAllEmployee());
      });
    closeAddPopup();
  };
  //xử lý chức năng xóa
  const handleDeleteEmployee = (employeeId) => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc muốn xóa nhân viên này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployee(employeeId))
          .then(() => {
            Swal.fire("Thành công!", "Đã xóa nhân viên thành công.", "success");
            dispatch(getAllEmployee());
          })
          .catch((error) => {
            Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình xóa", "error");
          });
      }
    });
  };
  //xử lý sửa
  const handleUpdateEmployee = () => {
    const payload = {
      id: selectedEmployee.id,
      name: newStaff.name || selectedEmployee.name,
      phone: newStaff.phone || selectedEmployee.phone,
      image: newStaff.image || selectedEmployee.employeeImg,
      gender: newStaff.gender || selectedEmployee.gender,
    };

    dispatch(updateEmployee(selectedEmployee.id, payload))
      .then(() => {
        Swal.fire("Thành công!", "Cập nhật thông tin nhân viên thành công", "success");
        dispatch(getAllEmployee());
      })
      .catch((error) => {
        Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình cập nhật", "error");
      });

    closePopup();
  };

  //tìm kiếm
  const filteredStaff = allStaff.filter(
    (employee) =>
      employee.role.roleName === "employee" &&
      employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //phân trang

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-primary font-medium">Quản lý nhân viên</h1>
        <div className="ml-auto">
          <Search
            placeholder="Tìm theo tên hoặc số điện thoại..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ml-auto text-primary text-3xl hover:opacity-80" onClick={openAddPopup}>
          <MdAddBox />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          filteredStaff.map((employee, index) => (
            <EmployeeCard
              key={index}
              name={employee.employeeName}
              phone={employee.employeePhone}
              role="Order"
              image={employee.employeeImg}
              gender={employee.employeeGender}
              onDelete={() => handleDeleteEmployee(employee.id)}
              onClick={() => openPopup(employee)}
            />
          ))}
      </div>
      {/* popup sửa */}
      {isPopupVisible && selectedEmployee && (
        <PopupEmployee
          isAdd={false}
          employeeData={newStaff}
          onClose={closePopup}
          onSubmit={handleUpdateEmployee}
          onChange={handleInputChange}
          role="order"
        />
      )}
      {/* popup thêm */}
      {isAddPopupVisible && (
        <PopupEmployee
          isAdd={true}
          onClose={closeAddPopup}
          onSubmit={addOrderStaff}
          employeeData={newStaff}
          onChange={handleInputChange}
          role="order"
        />
      )}
    </div>
  );
};

export default OrderEmployee;
