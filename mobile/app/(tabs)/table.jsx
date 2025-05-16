import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import { TableCard } from "../../components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/colors";
import { tableStyles } from "../../assets/styles";

const Table = () => {
  const dispatch = useDispatch();
  const { tables, halls } = useSelector((state) => state.table);
  const [selectedHall, setSelectedHall] = useState(null);

  useEffect(() => {
    dispatch(actions.getAllTable());
    dispatch(actions.getAllHall());
  }, [dispatch, tables]);

  //nhân viên giải quyết yêu cầu của khách
  const handleTable = (id) => {
    Alert.alert(
      "Xác nhận",
      "Bạn đã giải quyết xong yêu cầu của khách hàng chưa?",
      [
        {
          text: "Chưa",
          onPress: () => console.log("Chưa giải quyết"),
          style: "cancel",
        },
        {
          text: "Đã xong",
          onPress: () => {
            const updatedTable = tables.find((table) => table.id === id);
            updatedTable.status = "Đầy";
            dispatch(actions.updateTable(id, { status: "Đầy" }));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={tableStyles.container}>
      {selectedHall === null ? (
        halls && halls.length > 0 ? (
          <FlatList
            data={halls}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={tableStyles.hallButton}
                onPress={() => setSelectedHall(item.id)}
              >
                <Text style={tableStyles.hallText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={tableStyles.noHallText}>Không có sảnh nào</Text>
        )
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
            <TouchableOpacity onPress={() => setSelectedHall(null)} style={tableStyles.backButton}>
              <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={tableStyles.headerText}>
              Danh sách bàn - {halls.find((hall) => hall.id === selectedHall)?.name}
            </Text>
          </View>

          <FlatList
            data={[...tables]
              .filter((table) => table.hallID === selectedHall)
              .sort((a, b) => a.tableNumber - b.tableNumber)}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={({ item }) => <TableCard table={item} onPress={() => handleTable(item.id)} />}
            contentContainerStyle={tableStyles.listContainer}
          />
        </>
      )}
    </View>
  );
};

export default Table;
