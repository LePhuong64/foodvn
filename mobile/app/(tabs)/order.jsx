import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { orderStyles, orderDetailStyles } from "../../assets/styles";
import { getAllOrder, updateFoodStatus, updateOrderStatus } from "../../store/actions";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/colors";

const Order = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order || { order: [] });
  const { role, id } = useSelector((state) => state.auth);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(getAllOrder());
  }, [dispatch,order]);

  //nhân viên gửi đơn cho bếp
  const handleSendAllToKitchen = async (orderId, orderDetails) => {
    const hasPendingFood = orderDetails.some((item) => item.status === "pending");

    if (!hasPendingFood) {
      alert("Tất cả món ăn đã được xử lý, không thể gửi đơn!");
      return;
    }

    try {
      setSelectedOrder((prev) => ({
        ...prev,
        status: "preparing",
      }));

      dispatch(updateOrderStatus({ orderID: orderId, status: "preparing" }));

      alert("Đơn hàng đã được gửi cho bếp!");
    } catch (error) {
      alert("Lỗi khi gửi đơn: " + error.message);
    }
  };

  //nhân viên cập nhật món ăn
  const handleUpdateDishStatus = (orderDetailID, currentStatus, role) => {
    let newStatus = currentStatus;
    let confirmMessage = "";

    if (role === "chef" && currentStatus === "pending") {
      newStatus = "complete";
      confirmMessage = "Bạn đã hoàn thành món ăn? Hãy gửi cho phục vụ!";
    } else if (role === "employee" && currentStatus === "complete") {
      newStatus = "served";
      confirmMessage = "Bạn đã phục vụ món lên cho khách?";
    } else {
      alert("Bạn không thể thay đổi trạng thái này!");
      return;
    }

    Alert.alert(
      "Xác nhận",
      confirmMessage,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              dispatch(updateFoodStatus({ orderDetailID, status: newStatus }));
              setSelectedOrder((prevOrder) => {
                if (!prevOrder) return null;
                return {
                  ...prevOrder,
                  orderDetails: prevOrder.orderDetails.map((item) =>
                    item.id === orderDetailID ? { ...item, status: newStatus } : item
                  ),
                };
              });

              alert("Trạng thái món ăn đã được cập nhật!");
            } catch (error) {
              alert("Lỗi khi cập nhật trạng thái món ăn: " + error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  //xử lý thanh toán 
  const handleConfirmPayment = (orderId) => {
    Alert.alert(
      "Xác nhận thanh toán",
      "Bạn có chắc chắn đã hoàn tất thanh toán cho đơn này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              dispatch(updateOrderStatus({
                orderID: orderId,
                status: "paid",
                employeeID: id,
              }));

              setSelectedOrder((prev) => ({
                ...prev,
                status: "paid",
              }));
              alert("Đơn hàng đã được xác nhận thanh toán!");
            } catch (error) {
              alert("Lỗi khi xác nhận thanh toán: " + error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={orderStyles.container}>
      {selectedOrder === null ? (
        <>
          <Text style={orderStyles.title}>Danh sách gọi món</Text>
          <View style={orderStyles.tableHeader}>
            <Text style={orderStyles.headerCell}>Vị trí bàn</Text>
            <Text style={orderStyles.headerCell}>Trạng thái</Text>
            <Text style={orderStyles.headerCell}>Món đã lên</Text>
            <Text style={orderStyles.headerCell}>Chi tiết</Text>
          </View>

          <FlatList
            data={order.filter((item) => item.status !== "paid")}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const totalDishes = item.orderDetails.length;
              const servedDishes = item.orderDetails.filter((d) => d.status === "served").length;

              return (
                <View style={orderStyles.tableRow}>
                  <Text style={orderStyles.cell}>
                    {item.table.hall.name}-{item.table.tableNumber}
                  </Text>
                  <Text
                    style={[
                      orderStyles.cell,
                      item.status === "pending" ? orderStyles.pending : item.status === "paying" ? orderStyles.paying : orderStyles.completed,
                    ]}
                  >
                    {item.status === "pending"
                      ? "Đang gọi món"
                      : item.status === "paying"
                        ? "Đang thanh toán"
                        : "Đang phục vụ"}
                  </Text>
                  <Text style={orderStyles.cell}>
                    {servedDishes}/{totalDishes}
                  </Text>
                  <Pressable
                    style={orderStyles.button}
                    onPress={() => {
                      setSelectedOrder(item);
                    }}
                  >
                    <Text style={orderStyles.buttonText}>
                      {item.status === "paying" && role === "employee" ? "Xác nhận thanh toán" : "Chi tiết đơn"}
                    </Text>
                  </Pressable>
                </View>
              );
            }}
          />
        </>
      ) : (
        // order detail
        <View style={orderDetailStyles.container}>
          <View style={orderDetailStyles.header}>
            <Pressable onPress={() => setSelectedOrder(null)} style={orderDetailStyles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </Pressable>
            <Text style={orderDetailStyles.title}>Chi tiết đơn hàng</Text>
          </View>

          <Text style={orderDetailStyles.info}>
            Bàn {selectedOrder?.table?.tableNumber} - {selectedOrder.table.hall?.name}
          </Text>
          <Text style={orderDetailStyles.info}>
            Trạng thái đơn:{" "}
            {selectedOrder.status === "pending"
              ? "Đang gọi món"
              : selectedOrder.status === "paying"
                ? "Đang thanh toán"
                : "Đang phục vụ"}
          </Text>

          {/* Gửi đơn cho bếp */}
          {selectedOrder.status === "pending" && role !== "chef" && (
            <Pressable
              onPress={() => handleSendAllToKitchen(selectedOrder.id, selectedOrder.orderDetails)}
              style={({ pressed }) => [
                orderDetailStyles.buttonSend,
                pressed && orderDetailStyles.buttonPressed,
              ]}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    orderDetailStyles.buttonSendTxt,
                    pressed && orderDetailStyles.buttonPressed,
                  ]}
                >
                  Gửi đơn cho bếp
                </Text>
              )}
            </Pressable>
          )}

          {/* Xác nhận thanh toán */}
          {selectedOrder.status === "paying" && role === "employee" && (
            <Pressable
              onPress={() => handleConfirmPayment(selectedOrder.id)}
              style={({ pressed }) => [
                orderDetailStyles.buttonSend,
                pressed && orderDetailStyles.buttonPressed,
              ]}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    orderDetailStyles.buttonSendTxt,
                    pressed && orderDetailStyles.buttonPressed,
                  ]}
                >
                  Xác nhận thanh toán
                </Text>
              )}
            </Pressable>
          )}

          {/* Bảng theo dõi trạng thái món ăn */}
          <View style={orderDetailStyles.tableHeader}>
            <Text style={[orderDetailStyles.headerCell, { width: "40%" }]}>Tên món</Text>
            <Text style={[orderDetailStyles.headerCell, { width: "20%" }]}>Số lượng</Text>
            <Text style={[orderDetailStyles.headerCell, { width: "40%" }]}>Trạng thái</Text>
          </View>

          <FlatList
            data={
              role === "chef" && selectedOrder.status !== "preparing"
                ? [] // Nếu là đầu bếp nhưng đơn chưa "preparing", không hiển thị món
                : selectedOrder.orderDetails
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={orderDetailStyles.tableRow}>
                <Text style={[orderDetailStyles.cell, orderDetailStyles.dishName, { width: "40%" }]}>
                  {item.food.name}
                </Text>
                <Text style={[orderDetailStyles.cell, orderDetailStyles.quantity, { width: "20%" }]}>
                  {item.quantity}
                </Text>

                {/* update trạng thái món ăn */}
                <View style={[orderDetailStyles.cell, { width: "40%" }]}>
                  {role === "chef" || role === "employee" ? (
                    <Pressable
                      style={[
                        orderDetailStyles.button,
                        item.status === "complete" && orderDetailStyles.buttonCompleted,
                        item.status === "served" && orderDetailStyles.buttonCompleted,
                      ]}
                      onPress={() => handleUpdateDishStatus(item.id, item.status, role)}
                      disabled={role === "chef" && selectedOrder.status !== "preparing"} // Vô hiệu hóa nút khi chef chưa được phép
                    >
                      <Text style={orderDetailStyles.buttonCompletedText}>
                        {item.status === "pending"
                          ? "Chưa hoàn thành"
                          : item.status === "complete"
                            ? "Hoàn thành"
                            : "Đã phục vụ"}
                      </Text>
                    </Pressable>
                  ) : (
                    <Text style={orderDetailStyles.status}>
                      {item.status === "pending"
                        ? "Món đang chế biến"
                        : item.status === "complete"
                          ? "Món đã chế biến xong"
                          : "Món đã được phục vụ"}
                    </Text>
                  )}
                </View>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );

};

export default Order;
