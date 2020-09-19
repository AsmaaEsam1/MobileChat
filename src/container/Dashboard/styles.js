import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({
    TextScreen:{
        left: 10 ,
        color:color.WHITE, 
        fontWeight:'bold', 
        fontSize:18
    },
    TabBackgroundColor: {
        backgroundColor:color.DARK_GRAY
    },

    Text:{
    fontWeight:'bold',
    fontSize:13, 
    color:color.WHITE},

    BadgeChat:{
        height: 24, 
        width: 20, 
        backgroundColor: '#ECE5DD', 
        justifyContent: 'center', 
        alignSelf: 'center', 
        textAlign: 'center',
        left: 5},
        
    BadgeText:{
        fontSize: 11, color:color.BLACK, fontWeight:'bold'
        },
    FabChat:{
        backgroundColor:color.WHITE, margin: 20
        },
})