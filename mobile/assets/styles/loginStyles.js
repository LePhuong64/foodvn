import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const loginStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)", 
  },
  container: {
    width: "80%",
    padding: 20,
    backgroundColor: "rgba(246, 248, 250, 0.6)", 
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    color: colors.txtCard, 
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  iconButton: {
    padding: 12,
  },
  loginButton: {
    backgroundColor: colors.primary, 
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
