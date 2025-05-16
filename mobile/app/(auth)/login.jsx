import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import * as actions from "../../store/actions";
import { colors } from "../../constants/colors";
import { loginStyles } from "../../assets/styles";
import messaging from "@react-native-firebase/messaging";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoggedIn, msg, role } = useSelector((state) => state.auth);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fcmToken, setFcmToken] = useState("");

  //lấy tokentoken
  useEffect(() => {
    const fetchFcmToken = async () => {
      try {
        const token = await messaging().getToken();
        setFcmToken(token); 
      } catch (error) {
        console.error("Lỗi lấy FCM token:", error);
      }
    };
    fetchFcmToken();
  }, []);

  //đăng nhập
  const handleLogin = async () => {
    setLoading(true);
    try {
      dispatch(actions.login({ phone, password, fcmToken }));
    } catch (error) {
      console.error("Lỗi khi gửi login request:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "chef") {
        router.replace("/order");
      } else if (role === "employee" || role === "admin") {
        router.replace("/table");
      } else {
        Alert.alert("Lỗi đăng nhập", "Tài khoản không có quyền truy cập!", [{ text: "OK" }]);
      }
    }
  }, [isLoggedIn, role]);

  // Hiển thị Alert khi có lỗi
  useEffect(() => {
    if (msg) {
      Alert.alert("Lỗi đăng nhập", msg, [{ text: "OK" }]);
    }
  }, [msg]);

  return (
    <ImageBackground
      source={require("../../assets/images/bg-login.png")}
      style={loginStyles.backgroundImage}
    >
      <View style={loginStyles.overlay} />

      <View style={loginStyles.container}>
        <Text style={loginStyles.title}>Đăng nhập</Text>

        <TextInput
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          style={loginStyles.input}
        />

        <View style={loginStyles.passwordContainer}>
          <TextInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={loginStyles.passwordInput}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={loginStyles.iconButton}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={[loginStyles.loginButton, loading && { opacity: 0.5 }]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={loginStyles.loginButtonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
