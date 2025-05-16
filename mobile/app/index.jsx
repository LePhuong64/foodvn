import React, { useEffect } from "react";
import { View, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { splashStyles } from "../assets/styles";
import messaging from "@react-native-firebase/messaging";

export default function App() {
  const router = useRouter();

  // Yêu cầu quyền thông báo
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    requestUserPermission();

    // Chỉ đăng ký lắng nghe thông báo MỘT LẦN
    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("Thông báo mới!", JSON.stringify(remoteMessage));
    });

    return () => {
      unsubscribeOnMessage(); 
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={splashStyles.container}>
      <Image source={require("../assets/images/logo.png")} style={splashStyles.logo} />
    </View>
  );
}
