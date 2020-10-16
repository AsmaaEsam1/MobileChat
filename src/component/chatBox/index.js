import React, { useState } from "react";
import { View, Text, Image, ProgressBarAndroid, ProgressBarAndroidBase } from "react-native";
import { Card, CardItem } from "native-base";
import { deviceWidth } from "../../utility/styleHelper/appStyle";
import firebase from 'react-native-firebase'
import styles from "./styles";
import { color } from "../../utility";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "native-base";
import { format } from 'date-fns';
let showIcon = true
const ChatBox = ({ userId, msg, img,date, onImgTap,onAudioTap,playTimes,onAudioPause,show}) => {
  showIcon = show
  const uuid = firebase.auth().currentUser.uid;
  let isCurrentUser = userId === uuid ? true : false;
  return (
    <Card
      transparent
      style={{
        maxWidth: deviceWidth / 2 + 50,
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      }}>
      <View
        style={[
          styles.chatContainer,
          isCurrentUser && {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: color.DARK_GRAY,
          },
        ]}>
          
          {img ?(
            <View>
                      
          <CardItem cardBody>
            <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={{ height: 200, width: deviceWidth / 2 }}
              />
            </TouchableOpacity>
           
          </CardItem>
          </View>
        ) : (

          <View flexDirection='row'>  
          
     
            {msg ?(
              <Text
              style={[styles.chatTxt, isCurrentUser && { color: color.WHITE }]}>
                {msg}
            <Text
           style={[styles.chatdate, isCurrentUser && { color: color.SILVER }]}>
           {date}
           </Text>
          </Text>

            ):(
        <View style={{flexDirection:'column' }}>
         <View style={{flexDirection:'row' }}>
         <ProgressBarAndroid style={{width:70,color:color.WHITE,height:10,marginTop:15,marginLeft:10}} 
         styleAttr="Horizontal" indeterminate= {false}/>
               {showIcon? (<TouchableOpacity onPress={onAudioTap}>
                  <Icon
                    name='play-sharp'
                    resizeMode="cover"
                    style={{ color:color.WHITE ,alignSelf:'center',marginTop:8,marginLeft:5}} 
                    />
                </TouchableOpacity>):
                (<TouchableOpacity onPress={onAudioPause}>
                  <Icon
                    name='pause-sharp'
                    resizeMode="cover"
                    style={{ color:color.WHITE ,alignSelf:'center',marginTop:8,marginLeft:5}} 
                    />
                </TouchableOpacity>)
               }
                </View>
                <View style={{flexDirection:'row' }}>
                <Text style={{color:color.WHITE,fontSize:12,marginLeft:10}}>{playTimes}</Text>
             <Text style={[styles.chatdate, isCurrentUser && { color: color.SILVER }]}>
               {date}
            </Text>
            </View>
                </View>
            )}
            </View>
            
        )}
     </View>
    </Card>
  );
};

export default ChatBox;