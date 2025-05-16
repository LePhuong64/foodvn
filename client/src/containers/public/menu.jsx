import React, { useState, useEffect } from "react";
import { MenuCard, Search } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, getAllFood } from "../../store/actions";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

const Menu = () => {
  const { categories } = useSelector((state) => state.category);
  const { foods } = useSelector((state) => state.food);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllFood());
  }, [dispatch]);

  const validCategories = categories.filter((cat) => cat.categoryName);
  const categoryList = [{ id: "all", categoryName: "Tất cả" }, ...validCategories];

  const [selectedCategories, setSelectedCategories] = useState(["Tất cả"]);
  const [searchQuery, setSearchQuery] = useState(""); // State lưu từ khóa tìm kiếm
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Số món ăn trên mỗi trang

  // Xử lý chọn danh mục
  const handleCategoryChange = (categoryName) => {
    if (categoryName === "Tất cả") {
      setSelectedCategories(["Tất cả"]);
    } else {
      setSelectedCategories((prev) => {
        const isSelected = prev.includes(categoryName);
        const updated = isSelected
          ? prev.filter((c) => c !== categoryName)
          : [...prev, categoryName];

        return updated.length === 0 ? ["Tất cả"] : updated.filter((c) => c !== "Tất cả");
      });
    }
    setCurrentPage(1); // Reset về trang đầu khi chọn danh mục khác
  };

  // Lọc món theo danh mục
  const filteredFoods = selectedCategories.includes("Tất cả")
    ? foods
    : foods.filter((food) => selectedCategories.includes(food.category.categoryName));

  // Lọc món theo từ khóa tìm kiếm
  const searchedFoods = filteredFoods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Phân trang
  const totalPages = Math.ceil(searchedFoods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFoods = searchedFoods.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="w-full p-6 mt-20 flex gap-6">
      {/* Sidebar chọn danh mục */}
      <div className="w-1/4 bg-grayDark p-4 rounded-lg flex flex-col items-center">
        <label className="block mb-4 text-xl font-bold text-center">Chọn danh mục:</label>
        <div className="grid grid-cols-2 gap-3 w-full">
          {categoryList.map((category, index) => (
            <label
              key={`${category.id}-${index}`}
              className="flex items-center gap-2 cursor-pointer p-2 bg-white rounded-md shadow-md hover:bg-gray-100"
            >
              <input
                type="checkbox"
                className="accent-primary"
                checked={selectedCategories.includes(category.categoryName)}
                onChange={() => handleCategoryChange(category.categoryName)}
              />
              <span className="text-lg font-semibold">{category.categoryName}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Danh sách món ăn */}
      <div className="w-3/4">
        <div className="flex justify-center mb-6">
          <Search
            placeholder="Tìm kiếm món ăn"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentFoods.map((food, index) => (
            <MenuCard
              key={`${food.id}-${index}`}
              foodID={food.id}
              name={food.name}
              price={food.price}
              image={food.foodImg}
            />
          ))}
        </div>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"
                }`}
            >
              <GrFormPreviousLink size={24} />
            </button>

            <span className="text-lg font-semibold">
              Trang {currentPage} / {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-primary text-white hover:bg-primary-dark"
                }`}
            >
              <GrFormNextLink size={24} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
