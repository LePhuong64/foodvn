import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const orderDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  backButton: {
    padding: 5,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
  },

  info: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
    marginLeft: 5,
    color: colors.txtCard,
  },
  // Header bảng
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 5,
  },

  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.primary,
    borderRightWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 5,
  },

  // Dòng bảng
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 2,
    borderBottomWidth: 1,
    borderColor: colors.txtCard,
    width: '100%',  
  },

  cell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 5,
    minWidth: 100,  
  },

  dishName: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
    alignSelf: "center",
  },

  quantity: {
    flex: 1,
    color: colors.txtCard,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },

  status: {
    flex: 1,
    textAlign: "center",
  },

  //button gửi đơn
  buttonSend: {
    backgroundColor: colors.primary,
    paddingVertical: 10, 
    paddingHorizontal: 10, 
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginBottom:7,
    width: 150, 
    textAlign:"center",
  },
  buttonSendTxt:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  // Button complete
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    width: 110, 
    alignSelf: "center",
  },

  buttonCompletedText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 11,
  },
  buttonCompleted: {
    backgroundColor: colors.greenDark, 
    width: 90,
    alignSelf: "center",
  },

  buttonPressed: {
    opacity: 0.6, 
  },
});
