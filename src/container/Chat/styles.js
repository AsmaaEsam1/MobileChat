import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
  sendMessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  input: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: "70%",
  },
  recorder_container: {
    flex: 1,
    backgroundColor: "#2b608a",
  },
  sendBtnContainer: {
    height: appStyle.fieldHeight,
    backgroundColor: color.DARK_GRAY,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
    width: "29%",
  },
  
  thumbnailName: { fontSize: 25, color: color.WHITE, fontWeight: "bold" },
  logoContainer: {
    height: 40,
    width: 40,
    borderColor: color.WHITE,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.DARK_GRAY,
  },
});