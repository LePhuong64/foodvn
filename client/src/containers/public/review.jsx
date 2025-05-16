import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createReview, getReviewByOrderID } from "../../store/actions";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const ITEMS_PER_PAGE = 2;

const Review = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const order = location.state?.order;
    const { id } = useSelector((state) => state.auth);
    const { review } = useSelector((state) => state.review);

    const [reviews, setReviews] = useState([]);
    const [isReviewed, setIsReviewed] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [overallRating, setOverallRating] = useState(0);

    useEffect(() => {
        if (!order) {
            Swal.fire({
                icon: "error",
                title: "Không có dữ liệu!",
                text: "Vui lòng chọn hóa đơn để đánh giá.",
            }).then(() => navigate("/order"));
        } else {
            dispatch(getReviewByOrderID(order.id));
        }
    }, [order, dispatch, navigate]);

    useEffect(() => {
        if (review.length > 0) {
            setReviews(review.map((r) => ({
                name: r.food?.name || "Món ăn",
                foodImg: r.food?.foodImg || "",
                rating: r.rating,
                comment: r.comment,
            })));
            setIsReviewed(true);
        } else {
            setReviews(order?.orderDetails.map((item) => ({
                foodID: item.food.id,
                name: item.food.name,
                foodImg: item.food.foodImg,
                rating: 0,
                comment: "",
            })) || []);
            setIsReviewed(false);
        }
    }, [review, order]);

    const handleRatingChange = (index, rating) => {
        if (isReviewed) return;
        const newReviews = [...reviews];
        newReviews[index].rating = rating;
        setReviews(newReviews);
    };

    const handleCommentChange = (index, comment) => {
        if (isReviewed) return;
        const newReviews = [...reviews];
        newReviews[index].comment = comment;
        setReviews(newReviews);
    };

    const handleSubmit = () => {
        if (isReviewed) return;

        const isValid = reviews.every((review) => review.rating > 0);
        if (!isValid) {
            Swal.fire({
                icon: "warning",
                title: "Chưa hoàn thành đánh giá!",
                text: "Vui lòng đánh giá tất cả món ăn trước khi gửi.",
            });
            return;
        }

        const orderID = order?.id;
        const reviewData = reviews.map((review) => ({
            orderID,
            foodID: review.foodID,
            customerID: id,
            rating: review.rating,
            comment: review.comment,
        }));

        dispatch(createReview({ reviews: reviewData }));

        Swal.fire({
            iconHtml: "🎉",
            title: "Cảm ơn bạn đã đánh giá!",
            text: "Hãy ghé thăm chúng tôi lần sau để thưởng thức thêm những món ngon nhé!",
            confirmButtonText: "Đóng",
        }).then(() => navigate("/"));
    };

    const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentReviews = reviews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleOverallRatingChange = (rating) => {
        if (isReviewed) return;
        setOverallRating(rating);
        const newReviews = reviews.map((r) => ({ ...r, rating }));
        setReviews(newReviews);
    };


    return (
        <div className="max-w-2xl mx-auto my-16 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl text-primary font-semibold mb-6 text-center">
                Hãy cho chúng tôi biết cảm nhận của bạn!
            </h2>
            <div className="mb-6 text-center">
                <h3 className="text-xl font-semibold text-txtCard">Đánh giá toàn bộ</h3>
                <div className="flex justify-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleOverallRatingChange(i + 1)}
                            className={`text-3xl ${i < overallRating ? "text-primary" : "text-gray-300"}`}
                            disabled={isReviewed}
                        >
                            <FaStar />
                        </button>
                    ))}
                </div>
            </div>

            {currentReviews.map((food, index) => (
                <div key={food.foodID} className="border-b pb-4 mb-4">
                    <div className="flex items-center space-x-4">
                        <img src={food.foodImg} alt={food.name} className="w-20 h-20 object-cover rounded-lg" />
                        <h3 className="text-lg font-medium">{food.name}</h3>
                    </div>
                    <div className="mt-4">
                        <label className="block font-medium mb-2">Đánh giá:</label>
                        <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleRatingChange(startIndex + index, i + 1)}
                                    className={`text-2xl ${i < food.rating ? "text-primary" : "text-gray-300"}`}
                                    disabled={isReviewed}
                                >
                                    <FaStar />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block font-medium mb-2">Bình luận:</label>
                        <textarea
                            className="w-full border rounded-lg p-2"
                            placeholder="Nhập bình luận của bạn"
                            value={food.comment}
                            onChange={(e) => handleCommentChange(startIndex + index, e.target.value)}
                            disabled={isReviewed}
                        />
                    </div>
                </div>
            ))}
            <div className="flex justify-center">
                <motion.button
                    className="relative overflow-hidden border-2 border-primary text-primary rounded-lg font-semibold text-lg transition-all duration-300 group mt-4 px-6 py-2"
                    onClick={handleSubmit}
                >
                    <span className="relative z-10 group-hover:text-txtCard">Đánh giá</span>
                    <span className="absolute inset-0 bg-gradientPrimary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </motion.button>

            </div>

            {/* Phân trang */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"}`}
                    >
                        <GrFormPreviousLink size={24} />
                    </button>
                    <span className="text-lg font-semibold">
                        Trang {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"}`}
                    >
                        <GrFormNextLink size={24} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Review;
