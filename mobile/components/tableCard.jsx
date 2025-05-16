import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { tableCardStyles } from "../assets/styles";

const TableCard = ({ table, onPress }) => {
  let bgColor = tableCardStyles.default;

  if (table.status === "Trống") {
    bgColor = tableCardStyles.empty;
  } else if (table.status === "Đầy") {
    bgColor = tableCardStyles.full;
  } else if (table.status === "Gọi phục vụ") {
    bgColor = tableCardStyles.calling;
  }

  return (
    <View style={[tableCardStyles.container, bgColor]}>
      <Text style={tableCardStyles.text}>Bàn {table.tableNumber}</Text>
      <Text style={tableCardStyles.subText}>Số lượng: {table.maxQuantity}</Text>

      {table.status === "Gọi phục vụ" && (
        <TouchableOpacity
          style={tableCardStyles.handleButton}
          onPress={onPress}
        >
          <Text style={tableCardStyles.handleText}>Đã đến</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TableCard;
