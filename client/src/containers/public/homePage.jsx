import React, { useEffect, useRef, useState } from "react";
import { path } from '../../ultils/constant';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import About from "./about";
import Swal from "sweetalert2";
import { createOrder, getOneCustomer, getOrder } from '../../store/actions';
import { OrderForm } from "../../components";
import { Html5QrcodeScanner } from "html5-qrcode";

const HomePage = () => {
  const { isLoggedIn, id } = useSelector((state) => state.auth);
  const { customer } = useSelector((state) => state.customer);
  const { order } = useSelector((state) => state.order);

  const [showOrderForm, setShowOrderForm] = useState(false);
  const [numberTable, setNumberTable] = useState("");
  const [scanner, setScanner] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const aboutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(getOneCustomer(id));
      dispatch(getOrder(id));
    }

  }, [id, dispatch]);

  const handleGoToMenu = () => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Bạn chưa đăng nhập!",
        text: "Vui lòng đăng nhập để có thể thêm món vào giỏ hàng!",
        confirmButtonText: "Đăng nhập",
        showCancelButton: true,
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
      return;
    }

    if (order && order.length > 0 && order.some(o => o.status === "pending")) {
      navigate(`/${path.MENU}`);
    } else {
      setShowOrderForm(true);
    }
  };
  // Hàm xử lý tạo đơn hàng
  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!numberTable) {
      Swal.fire({
        icon: "warning",
        title: "Thông báo!",
        text: "Vui lòng nhập số bàn trước khi gọi món.",
        confirmButtonText: "OK",
      });
      return;
    }

    const payload = {
      customerID: id,
      tableNumber: numberTable,
    };

    try {
      // Đợi action hoàn thành
      const response = await dispatch(createOrder(payload));

      if (response?.err === 0) {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Mời bạn xem qua menu",
          confirmButtonText: "Xem menu",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/${path.MENU}`);
          }
        });

        setShowOrderForm(false);
        setNumberTable("");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Thông báo!",
          text: response?.message || "Có lỗi xảy ra khi tạo đơn hàng.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Thông báo!",
        text: error.message || "Có lỗi xảy ra khi tạo đơn hàng.",
        confirmButtonText: "OK",
      });
    }
  };


  // Quét QR để lấy số bàn
  const startScanner = () => {
    if (!scanner) {
      const newScanner = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: 250,
      });

      newScanner.render((decodedText) => {
        setNumberTable(decodedText.replace("table-", ""));
        newScanner.clear();
        setScanner(null);
      });

      setScanner(newScanner);
    }
  };

  useEffect(() => {
    if (location.hash === "#about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className='w-full overflow-hidden'>
      {/* order form */}
      {showOrderForm && (
        <OrderForm
          customerName={customer?.customerName || ""}
          numberTable={numberTable}
          setNumberTable={setNumberTable}
          onClose={() => setShowOrderForm(false)}
          onSubmit={handleSubmitOrder}
          onScan={startScanner}
        />
      )}
      {/* home background */}
      <div
        className="min-h-screen flex flex-row justify-between items-center lg:px-32 px-5 relative"
        style={{
          backgroundImage: "url(assets/img/home-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="w-full space-y-5 z-20 relative flex flex-col items-center">
          <h1 className="text-primary font-semibold text-6xl text-center" style={{ lineHeight: "1.5", letterSpacing: "0.05em" }}>
            Thưởng thức hương vị Việt đậm đà trong không gian ấm cúng tại nhà hàng của chúng tôi.
          </h1>
          <motion.button
            className="relative overflow-hidden border-2 border-primary text-primary py-3 px-10 rounded-full font-semibold text-lg transition-all duration-300 group"
            onClick={handleGoToMenu}
          >
            <span className="relative z-10 group-hover:text-txtCard">
              {order && order.length > 0 && order.some(o => o.status === "pending")
                ? "Xem menu"
                : "Gọi món ngay"}
            </span>
            <span className="absolute inset-0 bg-gradientPrimary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
          </motion.button>
        </div>
      </div>
      {/* about */}
      <motion.div ref={aboutRef} id="about" className="flex items-center justify-center relative z-30 pt-28" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>
        <About />
      </motion.div>
    </div>
  );
};

export default HomePage;
