import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getAllCustomer,
    getAllEmployee,
    getWeekRevenue,
    getMonthRevenue,
    getYearRevenue,
    getAllRevenue
} from "../../store/actions";
import { DashboardCart } from "../../components";
import { path } from "../../ultils/constant";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminHome = () => {
    const dispatch = useDispatch();
    const { count } = useSelector(state => state.customer);
    const { allRevenue, weekRevenue, monthRevenue, yearRevenue } = useSelector(state => state.revenue);
    const countOrderStaff = useSelector(state => state.employee.countOrderStaff);
    const countChefStaff = useSelector(state => state.employee.countChefStaff);

    const [year, setYear] = useState(2025);
    const [chartType, setChartType] = useState("Line");

    useEffect(() => {
        dispatch(getAllCustomer());
        dispatch(getAllEmployee());
        dispatch(getAllRevenue());
        dispatch(getWeekRevenue(year));
        dispatch(getMonthRevenue(year));
        dispatch(getYearRevenue(year));
    }, [dispatch, year]);

    // Tính tổng doanh thu
    const totalRevenue = allRevenue?.reduce((sum, item) => sum + item.total, 0) || 0;

    const cardsData = [
        { icon: '💰', title: 'Tổng Doanh thu', value: totalRevenue, bgColor: 'bg-primary', path: path.ADMIN_ORDER },
        { icon: '👥', title: 'Khách hàng', value: count, bgColor: 'bg-yellowLight', path: path.ADMIN_CUSTOMER },
        { icon: '👨‍🍳', title: 'Đầu bếp', value: countChefStaff, bgColor: 'bg-brownLight', path: path.ADMIN_CHEF },
        { icon: '🧑‍💼', title: 'Nhân viên', value: countOrderStaff, bgColor: 'bg-brownLight2', path: path.ADMIN_EMPLOYEE }
    ];

    // Lấy danh sách năm từ dữ liệu doanh thu
    const availableYears = [
        ...new Set([
            ...allRevenue?.map(item => item.year),
            ...weekRevenue?.map(item => item.year),
            ...monthRevenue?.map(item => item.year),
            ...yearRevenue?.map(item => item.year)
        ])
    ].sort((a, b) => a - b);

    // Tạo dữ liệu cho biểu đồ
    const generateChartData = (data, label, type) => ({
        labels: data?.map(item => {
            if (type === "week") return `Tuần ${item.week}`;
            if (type === "month") return `Tháng ${item.month}`;
            return `Năm ${item.year}`;
        }) || [],
        datasets: [{
            label,
            data: data?.map(item => Number(item.totalRevenue) || 0) || [],
            backgroundColor: "#f2af29",
            borderColor: "#f2af29",
            pointBorderColor: "#f2af29",
            pointBackgroundColor: "#f2af29",
            tension: 0.4, 
            fill: false,
        }]
    });

    // Cấu hình biểu đồ
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#1F384C", 
                    font: { size: 14, weight: "bold" }
                }
            },
            title: { display: true, text: "Biểu đồ doanh thu" }
        },
        scales: {
            x: { title: { display: true, text: "Thời gian" } },
            y: {
                title: { display: true, text: "Doanh thu" },
                beginAtZero: true,
                ticks: {
                    stepSize: 50000,
                    callback: value => value.toLocaleString()
                }
            }
        },
        interaction: {
            mode: "nearest", 
            intersect: true
        },
        hover: {
            mode: "nearest", 
            intersect: true
        },
        tooltips: {
            enabled: false 
        },
        events: ["mousemove"] 
    };

    // Chọn kiểu biểu đồ
    const ChartComponent = ({ data }) => {
        switch (chartType) {
            case "Bar":
                return <Bar data={data} options={chartOptions} />;
            default:
                return <Line data={data} options={chartOptions} />;
        }
    };

    return (
        <div className="p-8">
            {/* Hiển thị thông tin doanh thu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cardsData.map((card, index) => (
                    <DashboardCart
                        key={index}
                        icon={<span className="text-3xl">{card.icon}</span>}
                        title={card.title}
                        value={card.value}
                        bgColor={card.bgColor}
                        path={card.path}
                    />
                ))}
            </div>

            {/* Lựa chọn năm & kiểu biểu đồ */}
            <div className="flex justify-between items-center mt-8 mb-4">
                {/* Chọn năm */}
                <div>
                    <label className="mr-2 text-lg font-semibold">Chọn năm:</label>
                    <select className="border p-2 rounded" value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
                        {availableYears.map(y => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                {/* Chọn kiểu biểu đồ */}
                <div>
                    <label className="mr-2 text-lg font-semibold">Loại biểu đồ:</label>
                    <select className="border p-2 rounded" value={chartType} onChange={(e) => setChartType(e.target.value)}>
                        <option value="Line">Line</option>
                        <option value="Bar">Bar</option>
                    </select>
                </div>
            </div>

            {/* Hiển thị biểu đồ tuần, tháng, năm */}
            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-4 shadow-lg rounded-lg">
                    <h3 className="text-center text-3xl font-semibold mb-4 text-primary">Doanh thu theo tuần</h3>
                    <ChartComponent data={generateChartData(weekRevenue, "Doanh thu tuần", "week")} />
                </div>

                <div className="bg-white p-4 shadow-lg rounded-lg">
                    <h3 className="text-center text-3xl font-semibold mb-4 text-primary">Doanh thu theo tháng</h3>
                    <ChartComponent data={generateChartData(monthRevenue, "Doanh thu tháng", "month")} />
                </div>

                <div className="bg-white p-4 shadow-lg rounded-lg">
                    <h3 className="text-center text-3xl font-semibold mb-4 text-primary">Doanh thu theo năm</h3>
                    <ChartComponent data={generateChartData(yearRevenue, "Doanh thu năm", "year")} />
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
