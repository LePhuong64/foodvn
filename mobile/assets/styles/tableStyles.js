import { StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

export const tableStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grayDark,
    padding: 16,
  },
  hallButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    borderRadius: 12, 
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  hallText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  noHallText: {
    color: "#9ca3af",
    fontSize: 18,
    marginTop: 16,
    alignSelf: "center",
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 22, 
    color: colors.primary,
    fontWeight: "700",
  },
  listContainer: {
    alignItems: "center",
  },
  // Nút thông báo với badge
  notificationButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10, 
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, 
  },
  
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: "#ff3b30", 
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  // Modal thông báo
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)", 
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    padding: 24,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: colors.primary,
  },
  notificationItem: {
    marginBottom: 10,
    padding: 12,
    backgroundColor: "#f9fafb",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  notificationBody: {
    fontSize: 14,
    color: "#6b7280",
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
