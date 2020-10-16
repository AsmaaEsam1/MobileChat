import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
  chatContainer: { backgroundColor: color.skyblue,borderBottomLeftRadius:20,borderTopLeftRadius:20, borderTopRightRadius: 20,borderBottomRightRadius: 20 },

  chatTxt: {
    color: color.BLACK,
    fontSize: 16,
    marginVertical: 5,
    fontWeight: "500",
    padding: 5,
  },
  chatdate: {
    color: color.DARK_GRAY,
    fontSize: 11,
    marginVertical: 5,
    fontWeight: "500",
    paddingLeft:30,
    paddingRight:10,
  },
});