import React from "react";
import { View, Text, Image } from "react-native";
import { Card, CardItem } from "native-base";
import { deviceWidth } from "../../utility/styleHelper/appStyle";
import firebase from 'react-native-firebase'
import styles from "./styles";
import { color } from "../../utility";
import { TouchableOpacity } from "react-native-gesture-handler";

const ChatBox = ({ userId, msg, img,date, onImgTap }) => {
  const uuid = firebase.auth().currentUser.uid;
  let isCurrentUser = userId === uuid ? true : false;
  return (
    <Card
      transparent
      style={{
        maxWidth: deviceWidth / 2 + 10,
        alignSelf: isCurrentUser ? "flex-end" : "flex-start",
      }}
    >
      <View
        style={[
          styles.chatContainer,
          isCurrentUser && {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: color.DARK_GRAY,
          },
        ]}>
        {img ? (
          <CardItem cardBody>
            <TouchableOpacity onPress={onImgTap}>
              <Image
                source={{ uri: img }}
                resizeMode="cover"
                style={{ height: 200, width: deviceWidth / 2 }}
              />
            </TouchableOpacity>
          </CardItem>
        ) : (
          <View flexDirection='row'>  
          <Text
            style={[styles.chatTxt, isCurrentUser && { color: color.WHITE }]}>
            {msg}
            <Text
           style={[styles.chatdate, isCurrentUser && { color: color.SILVER }]}>
           {date}
         </Text>
          </Text>
           
        </View>
        )}
      </View>
    </Card>
  );
};

export default ChatBox;