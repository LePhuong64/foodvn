import React, { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { IoAdd, IoRemove } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addCart, deleteCart, updateCart, getCart } from "../store/actions";
import Swal from "sweetalert2";
import { path } from "../ultils/constant";

const MenuCard = ({ foodID, name, price, image }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoggedIn, id } = useSelector((state) => state.auth);
    const cartItems = useSelector((state) => Array.isArray(state.cart?.cartItems) ? state.cart.cartItems : []);
    useEffect(() => {
        if (id) {
            dispatch(getCart(id));
        }
    }, [dispatch, id]);

    // Lấy số lượng từ giỏ hàng nếu món ăn đã có
    const cartItem = Array.isArray(cartItems) ? cartItems.find(item => item.foodID === foodID) : null;
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);
    const [isEditing, setIsEditing] = useState(cartItem ? true : false);


    useEffect(() => {
        const updatedCartItem = cartItems.find(item => item.foodID === foodID);

        if (updatedCartItem) {
            setQuantity(updatedCartItem.quantity);
            setIsEditing(true);
        } else {
            setQuantity(0);
            setIsEditing(false);
        }
    }, [cartItems, foodID]);

    const handleAddToCart = () => {
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
                    navigate(`/${path.LOGIN}`)
                }
            });
            return;
        }
        const newItem = { foodID, customerID: id, quantity: 1 };

        dispatch(addCart(newItem));
        setIsEditing(true);
    };

    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        dispatch(updateCart({ foodID, customerID: id, quantity: newQuantity }));
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            dispatch(updateCart({ foodID, customerID: id, quantity: newQuantity }));
        } else {
            setIsEditing(false);
            setQuantity(0);
            dispatch(deleteCart(id, foodID));
        }
    };

    return (
        <div className="w-full max-w-xs bg-gradientPrimary shadow-lg rounded-xl overflow-hidden flex flex-col justify-between">
            <img src={image} alt={name} className="w-full h-60 object-cover" />

            <div className="p-4 text-center flex flex-col justify-between min-h-[200px]">
                <div>
                    <h3 className="text-2xl font-semibold text-txtCard">{name}</h3>
                    <p className="text-xl text-txtCard mt-2 mb-2">
                        {Number(price).toLocaleString("vi-VN")} VND
                    </p>
                </div>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Link
                        to={`/detail/${foodID}`}
                        className="relative overflow-hidden border-2 border-primary text-txtCard py-1 px-3 rounded-md font-medium text-sm transition-all duration-300 group"
                    >
                        <span className="relative text-lg z-10">Chi tiết</span>
                        <span className="absolute inset-0 bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </Link>
                </motion.div>

                <div className="mt-3 flex justify-center">
                    {isEditing && quantity > 0 ? (
                        <div className="flex items-center gap-4 mt-3">
                            <button
                                className="p-1 bg-grayDark rounded-full hover:bg-primary text-txtCard transition"
                                onClick={decreaseQuantity}
                            >
                                <IoRemove size={20} />
                            </button>
                            <span className="w-10 h-8 text-center border rounded-lg text-base font-semibold bg-white flex items-center justify-center">
                                {quantity}
                            </span>
                            <button
                                className="p-1 bg-grayDark rounded-full hover:bg-primary text-txtCard transition"
                                onClick={increaseQuantity}
                            >
                                <IoAdd size={20} />
                            </button>
                        </div>
                    ) : (
                        <button
                            className="bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
                            onClick={handleAddToCart}
                        >
                            <CiShoppingCart size={22} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
