import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
    baseURL: "http://192.168.1.149:5000",
});

instance.interceptors.request.use(
  async function (config) {
    try {
      const authData = await AsyncStorage.getItem("persist:auth");
      const parsedAuth = authData ? JSON.parse(authData) : {};
      const token = parsedAuth.token ? parsedAuth.token.replace(/"/g, "") : null;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Error fetching token", error);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
