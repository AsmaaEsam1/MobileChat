import { StyleSheet } from "react-native";
import { color, appStyle } from "../../utility";

export default StyleSheet.create({

BackgroundImg:{
    flex:1, width: null,alignSelf: 'stretch', backgroundColor: 'rgb(0,0,0)'
},
TextName:{
    color:color.WHITE,fontWeight: "bold",fontSize:30, marginBottom:10
},
TextNameImage:{
    backgroundColor:color.BLACK,color:color.WHITE , justifyContent:'center'
},
TextRinning:{
    color:color.WHITE,fontSize:18, marginBottom:500
},
TextCalling:{
    color:color.WHITE,fontSize:18, marginBottom:150
},
text:{
    color:color.WHITE,fontSize:200,fontWeight:"bold",marginBottom:100
},
thumbnailName: { 
    fontSize: 200, color: color.WHITE, fontWeight: "bold" 
},
FabEndCalling: {
    backgroundColor:color.RED , justifyContent:'center'
},
FabStartCalling:{
    backgroundColor:color.GREEN , justifyContent:'center'
},
})