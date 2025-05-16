import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { InputForm } from "../../components";
import { getOneCustomer, updateCustomer } from "../../store/actions";
import Swal from 'sweetalert2'

const Profile = () => {
  const { role, id } = useSelector((state) => state.auth);
  const { customer } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    birthday: "",
    oldPassword: "",
    newPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Gọi API lấy thông tin khách hàng
  useEffect(() => {
    if (id) {
      dispatch(getOneCustomer(id));
    }
  }, [id, dispatch]);

  // Điền thông tin khách hàng vào form
  useEffect(() => {
    if (customer) {
      setCustomerInfo({
        name: customer.customerName || "",
        phone: customer.customerPhone || "",
        email: customer.customerEmail || "",
        birthday: customer.customerBirthday || "",
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [customer]);

  // Xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (customerInfo.newPassword && customerInfo.newPassword.length < 6) {
      Swal.fire("Lỗi!", "Mật khẩu mới phải có ít nhất 6 ký tự.", "error");
      return;
    }
  
    if (
      customerInfo.newPassword &&
      customerInfo.oldPassword &&
      customerInfo.newPassword === customerInfo.oldPassword
    ) {
      Swal.fire("Lỗi!", "Mật khẩu mới không được trùng với mật khẩu cũ.", "error");
      return;
    }
  
    const payload = {
      name: customerInfo.name,
      phone: customerInfo.phone,
      email: customerInfo.email,
      birthday: customerInfo.birthday, 
    };
  
    if (customerInfo.oldPassword && customerInfo.newPassword) {
      payload.oldPassword = customerInfo.oldPassword;
      payload.newPassword = customerInfo.newPassword;
    }
  
    dispatch(updateCustomer(id, payload))
      .then(() => {
        Swal.fire("Thành công!", "Cập nhật thông tin thành công.", "success");
      })
      .catch((error) => {
        Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình cập nhật.", "error");
      });
  };
  
  // Điều hướng nếu role là admin
  if (role === "admin") return <Navigate to={"/admin"} />;

  return (
    <div style={{ marginTop: "150px" }}>
      <form className="max-w-md mx-auto bg-bgForm p-6 shadow-md rounded" onSubmit={handleSubmit}>
        <h2 className="text-center text-primary font-medium text-2xl mb-8">
          Cập nhật thông tin
        </h2>
        <div className="mb-4">
          <InputForm
            placeholder="Họ tên"
            value={customerInfo.name}
            name="name"
            onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <InputForm
            placeholder="Số điện thoại"
            value={customerInfo.phone}
            name="phone"
            onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <InputForm
            placeholder="Email"
            value={customerInfo.email}
            name="email"
            onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <InputForm
            placeholder="Ngày sinh"
            type="date"
            value={customerInfo.birthday}
            name="birthday"
            onChange={(e) => setCustomerInfo({ ...customerInfo, birthday: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <InputForm
            isPassword
            placeholder="Mật khẩu cũ"
            value={customerInfo.oldPassword}
            name="oldPassword"
            onChange={(e) => setCustomerInfo({ ...customerInfo, oldPassword: e.target.value })}
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
            className="flex-1"
          />
        </div>
        <div className="mb-4">
          <InputForm
            isPassword
            placeholder="Mật khẩu mới"
            value={customerInfo.newPassword}
            name="newPassword"
            onChange={(e) => setCustomerInfo({ ...customerInfo, newPassword: e.target.value })}
            togglePasswordVisibility={togglePasswordVisibility}
            showPassword={showPassword}
            className="flex-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary font-medium text-white py-2 px-4 rounded hover:opacity-90 transition duration-200"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default Profile;
