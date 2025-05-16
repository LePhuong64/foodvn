import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Header } from "../../components";
import * as actions from "../../store/actions";

const Layout = () => {
  const dispatch = useDispatch();
  const { id, role } = useSelector((state) => state.auth);
  const { employee } = useSelector((state) => state.employee);

  useEffect(() => {
    if (id) {
      dispatch(actions.getOneEmployee(id));
    }
  }, [id, dispatch]);

  if (role === "chef") {
    // 🔥 Nếu role là "chef", chỉ hiển thị màn hình order mà không có Tabs
    return (
      <Stack>
        <Stack.Screen
          name="order"
          options={{
            header: () => <Header name={employee.employeeName} avatar={employee.employeeImg} />,
          }}
        />
      </Stack>
    );
  }

  return (
    <Tabs
      screenOptions={{
        header: () => <Header name={employee.employeeName} avatar={employee.employeeImg} />,
        tabBarActiveTintColor: "#007AFF",
      }}
    >
      <Tabs.Screen
        name="table"
        options={{
          title: "Quản lý bàn",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="table-restaurant" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: "Gọi món",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="menu-book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
