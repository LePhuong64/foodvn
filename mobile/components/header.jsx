import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Modal, FlatList } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../constants/colors";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions";
import { headerStyles } from "../assets/styles";
import messaging from "@react-native-firebase/messaging";

const Header = ({ name, avatar }) => {
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    // Lắng nghe thông báo từ Firebase
    useEffect(() => {
        const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
            setNotifications((prev) => [
                ...prev,
                {
                    id: new Date().getTime(),
                    title: remoteMessage.notification?.title || "Thông báo",
                    body: remoteMessage.notification?.body || "Có cập nhật mới!",
                },
            ]);
        });

        return unsubscribeOnMessage;
    }, []);

    // Xử lý đăng xuất
    const handleLogout = () => {
        dispatch(actions.logout());
    };

    // Xóa thông báo khi đã xem
    const handleClearNotifications = () => {
        setNotifications([]);
        setModalVisible(false);
    };

    // Ảnh đại diện mặc định
    const defaultImg = require("../assets/images/logo.png");

    return (
        <View style={headerStyles.container}>
            {/* Thông tin người dùng */}
            <View style={headerStyles.userInfo}>
                <Image source={avatar ? { uri: avatar } : defaultImg} style={headerStyles.avatar} />
                <Text style={headerStyles.userName}>{name}</Text>
            </View>

            {/* Nhóm icon thông báo và logout */}
            <View style={headerStyles.rightIcons}>
                {/* Nút thông báo */}
                <TouchableOpacity style={headerStyles.notificationButton} onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="notifications" size={20} color={colors.primary} />
                    {notifications.length > 0 && (
                        <View style={headerStyles.badge}>
                            <Text style={headerStyles.badgeText}>{notifications.length}</Text>
                        </View>
                    )}
                </TouchableOpacity>

                {/* Nút logout */}
                <TouchableOpacity onPress={handleLogout} style={headerStyles.logoutButton}>
                    <MaterialIcons name="logout" size={22} color={colors.redDark} />
                </TouchableOpacity>
            </View>

            {/* Modal danh sách thông báo */}
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={headerStyles.modalContainer}>
                    <View style={headerStyles.modalContent}>
                        <Text style={headerStyles.modalTitle}>Thông báo mới</Text>

                        {/* Bọc danh sách thông báo trong View có flex để tránh che nút đóng */}
                        <View style={{ flexGrow: 1, maxHeight: 300 }}>
                            <FlatList
                                data={notifications}
                                keyExtractor={(item) => item.id.toString()}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <View style={headerStyles.notificationItem}>
                                        <Text style={headerStyles.notificationTitle}>{item.title}</Text>
                                        <Text style={headerStyles.notificationBody}>{item.body}</Text>
                                    </View>
                                )}
                            />
                        </View>

                        {/* Nút đóng luôn hiển thị */}
                        <TouchableOpacity onPress={handleClearNotifications} style={headerStyles.closeButton}>
                            <Text style={headerStyles.closeButtonText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Header;
