import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { IoAdd, IoRemove } from "react-icons/io5";
import Swal from "sweetalert2";
import { addCart, deleteCart, getCart, getOneFood, updateCart, getReviewByFood } from "../../store/actions";

const FoodDetail = () => {
    const { foodID } = useParams();
    const { id } = useSelector((state) => state.auth);
    const { food } = useSelector((state) => state.food);
    const { review, averageRating } = useSelector((state) => state.review || []);
    const cartItems = useSelector((state) => Array.isArray(state.cart?.cartItems) ? state.cart.cartItems : []);
    const dispatch = useDispatch();

    const cartItem = cartItems.find(item => Number(item.foodID) === Number(foodID));
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);
    const [isInCart, setIsInCart] = useState(!!cartItem);

    useEffect(() => {
        dispatch(getOneFood(foodID));
        dispatch(getReviewByFood(foodID));

        if (id) {
            dispatch(getCart(id));
        }
    }, [dispatch, foodID, id]);

    useEffect(() => {
        const updatedCartItem = cartItems.find(item => Number(item.foodID) === Number(foodID));
        if (updatedCartItem) {
            setQuantity(updatedCartItem.quantity);
            setIsInCart(true);
        } else {
            setQuantity(0);
            setIsInCart(false);
        }
    }, [cartItems, foodID]);

    if (!food) return <p className="text-center text-gray-500">Đang tải dữ liệu...</p>;

    const handleAddToCart = () => {
        if (!id) {
            Swal.fire("Thông báo", "Bạn cần đăng nhập để thêm vào giỏ hàng!", "warning");
            return;
        }

        if (!isInCart) {
            const newItem = { foodID, customerID: id, quantity: 1 };
            dispatch(addCart(newItem));
        }
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
            setIsInCart(false);
            setQuantity(0);
            dispatch(deleteCart(id, foodID));
        }
    };

    const ratingCounts = review.reduce((acc, curr) => {
        acc[curr.rating] = (acc[curr.rating] || 0) + 1;
        return acc;
    }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const totalReviews = review.length || 1;

    return (
        <div className="w-full mt-20 p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Ảnh món ăn */}
            <div className="w-full flex justify-center">
                <img src={food.foodImg} alt={food.name} className="rounded-lg shadow-lg" />
            </div>

            {/* Thông tin món ăn */}
            <div>
                <h1 className="text-4xl font-bold text-txtCard">{food.name}</h1>
                <p className="text-3xl text-primary mt-4 font-bold">{Number(food.price).toLocaleString("vi-VN")} VND</p>

                {/* Mô tả */}
                <div className="mt-6">
                    <h2 className="text-2xl text-txtCard font-bold">Thông tin chi tiết</h2>
                    <p className="text-xl text-txtCard mt-2 text-justify">{food.description}</p>
                </div>

                {/* Chọn số lượng */}
                {isInCart && (
                    <div className="flex items-center gap-4 mt-6">
                        <button
                            className="p-1 bg-grayDark rounded-full hover:bg-primary text-txtCard transition"
                            onClick={decreaseQuantity}
                        >
                            <IoRemove size={24} />
                        </button>
                        <span className="w-10 h-8 text-center border rounded-lg text-base font-semibold bg-white flex items-center justify-center">
                            {quantity}
                        </span>
                        <button
                            className="p-1 bg-grayDark rounded-full hover:bg-primary text-txtCard transition"
                            onClick={increaseQuantity}
                        >
                            <IoAdd size={24} />
                        </button>
                    </div>
                )}
                {!isInCart && (
                    <motion.button
                        className="mt-6 bg-primary text-white py-3 px-6 rounded-lg shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleAddToCart}
                    >
                        Thêm món
                    </motion.button>
                )}
            </div>

            {/* Phần đánh giá và bình luận */}
            <div className="w-full col-span-2">
                <h2 className="text-3xl font-bold text-txtCard">Đánh giá & Bình luận</h2>
                <span className="text-2xl font-semibold italic mt-4 block text-primary">
                    {averageRating} <span className="text-primary"> / 5⭐</span> ({review.length} đánh giá)
                </span>

                {/* Thanh đếm số sao */}
                <div className="mt-4 space-y-2">
                    {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="flex items-center gap-2">
                            <span className="flex items-center text-xl text-txtCard mr-2 ">
                                {star} <FaStar className="text-primary ml-2" size={20} />
                            </span>
                            <div className="w-1/3 h-4 bg-gray-300 rounded-lg overflow-hidden">
                                <div
                                    className="h-full bg-primary transition-all"
                                    style={{ width: `${(ratingCounts[star] / totalReviews) * 100}%` }}
                                ></div>
                            </div>
                            <span className="text-txtCard text-lg ml-2">({ratingCounts[star] || 0})</span>
                        </div>
                    ))}
                </div>
                {/* Danh sách đánh giá */}
                <div className="mt-4 space-y-4">
                    {review.length > 0 ? (
                        review.map((review, index) => (
                            <div key={index} className="p-4 bg-gray-100 rounded-lg">
                                <p className="text-2xl mb-2 text-txtCard font-semibold">
                                    {review.customer?.customerName || "Người dùng ẩn danh"}
                                </p>
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar key={i} className={i < review.rating ? "text-primary" : "text-gray-300"} size={24} />
                                    ))}
                                </div>
                                <p className="mt-2 text-xl text-txtCard">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">Chưa có đánh giá nào.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default FoodDetail;
