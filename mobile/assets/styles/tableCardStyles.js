import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const tableCardStyles = StyleSheet.create({
  container: {
    width: 96, 
    height: 96, 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    margin: 8, 
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16, 
  },
  subText: {
    color: "white",
    fontSize: 12, 
  },
  empty: {
    backgroundColor: colors.greenDark, // "Trống"
  },
  full: {
    backgroundColor: colors.redDark, // "Đầy"
  },
  calling: {
    backgroundColor: colors.primary, // bàn đang gọi phục vụ
  },
  default: {
    backgroundColor: "gray",
  },
  handleButton: {
    borderRadius: 5, 
    marginTop: 5, 
    justifyContent: "center", 
    alignItems: "center",
    borderWidth: 1, 
    borderColor: colors.bgWhite, 
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  handleText: {
    color: "white", 
    fontSize: 11, 
    fontWeight: "bold", 
  }
});
