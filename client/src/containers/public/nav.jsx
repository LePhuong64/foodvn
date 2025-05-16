import { Link, useNavigate } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import { CiShoppingCart, CiUser, CiViewList } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { path } from "../../ultils/constant";
import { useSelector, useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import * as actions from '../../store/actions';
import Swal from "sweetalert2";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, id } = useSelector(state => state.auth);
  const { count } = useSelector((state) => state.cart || {});
  const { order = [] } = useSelector((state) => state.order || { order: [] });

  //lọc đơn
  const activeOrder = order.find(o => o.status === "pending");


  const goLogin = useCallback((flag) => {
    navigate(`/${path.LOGIN}`, { state: { flag } });
  }, []);

  const handleLogout = () => {
    dispatch(actions.logout());
    navigate('/');
  };

  useEffect(() => {
    if (id) {
      dispatch(actions.getOrder(id));
    }
  }, [id, dispatch]);

  //gọi phục vụ
  const handleCallService = () => {
    if (!activeOrder || !activeOrder.table) return;

    Swal.fire({
      title: "Bạn muốn gọi phục vụ sao?",
      text: `Bàn ${activeOrder.table.tableNumber}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Gọi phục vụ",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = { status: "Gọi phục vụ" };
        dispatch(actions.updateTable(activeOrder.table.id, payload))
          .then(() => {
            Swal.fire("Bạn đợi chút, phục vụ đang đến!", "", "success");
          })
          .catch(() => {
            Swal.fire("Gọi không thành công!", "", "error");
          });
      }
    });
  };

  return (
    <nav className="bg-gradientPrimary relative px-4 py-4 flex justify-between items-center">
      {/* logo */}
      <Link className="text-3xl font-bold leading-none ml-10" to={'/'}>
        <img src="/assets/img/logoden.png" alt="logo" className="w-20 h-auto" />
      </Link>

      {/* menu */}
      <ul className="flex-grow flex justify-center space-x-20 ml-24">
        <li><Link className="text-xl font-bold text-txtCard hover:text-accent2" to={'/'}>Trang chủ</Link></li>
        <li><a className="text-xl text-txtCard font-bold hover:text-accent2" href="/#about">Giới thiệu</a></li>
        <li><Link className="text-xl text-txtCard font-bold hover:text-accent2" to={`/${path.MENU}`}>Thực đơn</Link></li>
      </ul>

      <div className="flex space-x-6 items-center">
        {isLoggedIn && activeOrder?.table?.tableNumber && activeOrder?.table?.status !== 'Gọi phục vụ' && activeOrder?.status !== 'paid' && (
          <motion.button
            onClick={handleCallService}
            className="relative overflow-hidden border-2 border-primary text-txtCard py-2 px-6 rounded-lg font-semibold text-sm transition-all duration-300 group"
          >
            <span className="relative z-10 group-hover:text-txtCard">
              Gọi phục vụ bàn {activeOrder.table.tableNumber}
            </span>
            <span className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </motion.button>
        )}
        {isLoggedIn ? (
          <>
            {/* đơn hàng */}
            <div className="relative flex items-center space-x-2">
              <Link to={`/${path.ORDER}`} className="text-txtCard hover:text-accent2">
                <CiViewList className="text-3xl" />
              </Link>
            </div>

            <Link to={`/${path.SHOPPING_CART}`} className="relative text-txtCard hover:text-accent2">
              <CiShoppingCart className="text-3xl" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-txtCard text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Hiển thị icon user */}
            <div className="relative flex items-center space-x-2">
              <Link to={`/${path.PROFILE}`} className="text-txtCard hover:text-accent2">
                <CiUser className="text-3xl" />
              </Link>
            </div>

            <button onClick={handleLogout} className="text-txtCard hover:text-accent2">
              <IoIosLogOut className="text-3xl" />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <motion.button
              className="relative overflow-hidden border-2 border-primary text-txtCard py-2 px-6 rounded-lg font-semibold text-sm transition-all duration-300 group"
              onClick={() => goLogin(false)}
            >
              <span className="relative z-10 group-hover:text-txtCard">
                Đăng nhập
              </span>
              <span className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </motion.button>
            <motion.button
              className="relative overflow-hidden border-2 border-primary text-txtCard py-2 px-6 rounded-lg font-semibold text-sm transition-all duration-300 group"
              onClick={() => goLogin(true)}
            >
              <span className="relative z-10 group-hover:text-txtCard">
                Đăng ký
              </span>
              <span className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </motion.button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
