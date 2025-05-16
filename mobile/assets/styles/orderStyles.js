import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const orderStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: colors.primary
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 8,
    borderWidth: 2,  
    borderColor: colors.primary,
    borderRadius: 5, 
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 10,
    marginBottom: 2,
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
  cell: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 5,
  },
  pending: {
    color: colors.primary,
    fontWeight: "bold",
  },
  completed: {
    color: colors.greenDark,
    fontWeight: "bold",
  },
  paying:{
    color: colors.greenDark,
    fontWeight: "bold",
  },
  button: {
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: colors.blueDark,
    fontWeight: "bold",
  },
});
