import React from "react";
 
function About() {
    return (
        <div className="flex flex-col items-center text-center">
            <div className="max-w-7xl">
                <h1 className="text-4xl text-primary font-bold mb-2 flex justify-center">GIỚI THIỆU</h1>
                <p className="text-xl text-gray-600 mb-5">
                    Tại đây, bạn sẽ được thưởng thức các món ăn truyền thống được chế biến từ nguyên liệu tươi ngon nhất.
                    Không gian ấm cúng và dịch vụ tận tâm của chúng tôi sẽ mang lại trải nghiệm khó quên.
                    Hãy để chúng tôi đưa bạn vào hành trình khám phá những hương vị đậm đà của đất Việt!
                </p>
            </div>
            <div>
                <img
                    src="assets/img/about-bg.png"
                    alt="about"
                    className="max-w-full h-auto"
                />
            </div>
            <div className="flex flex-wrap justify-center gap-20 mt-10">
                {/* Icon 1 */}
                <div className="flex flex-col items-center max-w-xs">
                    <img
                        src="assets/icon/chef-icon.png"
                        alt="chef"
                        className="w-16 h-16 mb-4"
                    />
                    <h1 className="text-xl text-[#FABC3F] font-semibold mb-2">Đầu bếp</h1>
                    <p className="text-gray-600 text-center">
                        Được chế biến bởi những đầu bếp giàu kinh nghiệm, mỗi món ăn là một tác phẩm nghệ thuật.
                    </p>
                </div>
                {/* Icon 2 */}
                <div className="flex flex-col items-center max-w-xs">
                    <img
                        src="assets/icon/food-icon.png"
                        alt="food"
                        className="w-16 h-16 mb-4"
                    />
                    <h1 className="text-xl text-[#FABC3F] font-semibold mb-2">Thức ăn</h1>
                    <p className="text-gray-600 text-center">
                        Nhà hàng của chúng tôi tự hào mang đến thực đơn đa dạng các món ăn đặc sắc, đại diện cho tinh hoa ẩm thực Việt Nam từ Bắc chí Nam.
                    </p>
                </div>
                {/* Icon 3 */}
                <div className="flex flex-col items-center max-w-xs">
                    <img
                        src="assets/icon/attp-icon.png"
                        alt="safety"
                        className="w-16 h-18 mb-4"
                    />
                    <h1 className="text-xl text-[#FABC3F] font-semibold mb-2">An toàn thực phẩm</h1>
                    <p className="text-gray-600 text-center">
                        Từng món ăn được chế biến từ nguyên liệu tươi ngon, đảm bảo chất lượng và hương vị truyền thống.
                    </p>
                </div>
            </div>
        </div>
    );
}
export default About;