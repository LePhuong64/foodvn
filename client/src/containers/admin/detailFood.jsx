import React, { useEffect, useState } from "react";
import { FoodCard, PopupFood } from "../../components";
import { MdAddBox } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createFood, deleteFood, getAllFood, updateFood } from "../../store/actions/food";
import Swal from 'sweetalert2'
import { getAllCategory } from "../../store/actions";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const DetailFood = () => {
  const [isAddPopupVisible, setIsAddPopupVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newFood, setNewFood] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    categoryName: "",
  });

  const { categoryName } = useParams();
  const { foods } = useSelector((state) => state.food);
  const { role } = useSelector(state => state.auth)

  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const filteredFoods = foods.filter((food) => food.category && food.category.categoryName === categoryName);

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
  const currentFoods = filteredFoods.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //get all food
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFood());
    dispatch(getAllCategory());
  }, [dispatch]);

  // popup thêm
  const openAddPopup = () => {
    setIsAddPopupVisible(true);
  };
  const closeAddPopup = () => {
    setIsAddPopupVisible(false);
    setNewFood({ name: "", price: "", description: "", image: null, categoryName: "" });
  };
  // popup sửa
  const openPopup = (food) => {
    setSelectedFood(food);
    setNewFood({
      name: food.name,
      price: food.price,
      description: food.description,
      image: food.foodImg,
      categoryId: food.category.id,
    });
    setIsPopupVisible(true);
  };
  //close
  const closePopup = () => {
    setIsPopupVisible(false);
    setSelectedFood(null);
    setNewFood({ name: "", price: "", description: "", image: null, categoryName: "" });
  };
  //xử lý thay đổi khi nhập
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFood((prev) => ({ ...prev, image: file }));
    }
  };
  //hàm thêm
  const handleAddFood = async (e) => {
    const payload = {
      name: newFood.name,
      price: newFood.price,
      description: newFood.description,
      image: newFood.image,
      categoryName: categoryName,
    }
    dispatch(createFood(payload))
      .then(() => {
        Swal.fire("Thành công!", "Thêm thức ăn thành công", "success");
        dispatch(getAllFood());
      })
      .catch((error) => {
        Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình thêm", "error");
        dispatch(getAllFood());
      });
    closeAddPopup();
  }
  //hàm sửa
  const handleUpdateFood = () => {
    const payload = {
      name: newFood.name || selectedFood.name,
      price: newFood.price || selectedFood.price,
      description: newFood.description || selectedFood.description,
    }
    if (newFood.image && newFood.image !== selectedFood.foodImg) {
      payload.image = newFood.image;
    }
    dispatch(updateFood(selectedFood.id, payload))
      .then((response) => {
        Swal.fire("Thành công!", "Cập nhật thông tin thành công", "success");
        dispatch(getAllFood());
      })
      .catch((error) => {
        Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình cập nhật", "error");
      });
    closePopup()
  }
  //hàm xóa
  const handleDeleteFood = (food) => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc muốn xóa không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteFood(food))
          .then(() => {
            Swal.fire("Thành công!", "Đã xóa thành công.", "success");
            dispatch(getAllFood());
          })
          .catch((error) => {
            Swal.fire("Lỗi!", error.message || "Đã xảy ra lỗi trong quá trình xóa", "error");
          });
      }
    });
  };
  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-primary font-medium">{categoryName}</h1>
        <div className="ml-auto text-primary text-3xl hover:opacity-80 cursor-pointer" onClick={openAddPopup}>
          <MdAddBox />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentFoods.map((food, index) => (
          <FoodCard
            key={index}
            name={food.name}
            price={food.price}
            image={food.foodImg}
            onDelete={() => handleDeleteFood(food.id)}
            onClick={() => openPopup(food)}
            role={role}
          />
        ))}
      </div>
      {/* phân trang */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6">
          <button
             className={`px-3 py-1 rounded-full mx-1 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <GrFormPreviousLink size={24} />
          </button>
          <span className="mx-2 text-primary">Trang {currentPage} / {totalPages}</span>
          <button
           className={`px-3 py-1 mx-1 rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-primary text-white"}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <GrFormNextLink size={24} />
          </button>
        </div>
      )}
      {/* popup thêm */}
      {isAddPopupVisible && (
        <PopupFood
          isAdd={true}
          onClose={closeAddPopup}
          onChange={handleChange}
          onImageChange={handleImageChange}
          category={categoryName}
          name={newFood.name}
          price={newFood.price}
          description={newFood.description}
          onSubmit={handleAddFood}
        />
      )}
      {/* popup sửa */}
      {isPopupVisible && (
        <PopupFood
          isAdd={false}
          onClose={closePopup}
          onChange={handleChange}
          onImageChange={handleImageChange}
          name={newFood.name}
          price={newFood.price}
          description={newFood.description}
          onSubmit={handleUpdateFood}
        />
      )}
    </div>
  )
}

export default DetailFood;