import React, { useEffect } from "react";
import { Text ,View} from "react-native";
import { Card, CardItem, Left, Body, Thumbnail, Right, Badge } from "native-base";
import styles from "./styles";
import { color } from "../../utility";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";


const ShowUsers = ({ name, img, date, lastMessages,guseterUserIds, onImgTap, onNameTap }) => {
  useEffect(()=>{
    guseterUserIds
  })
  return (
    <Card style={styles.cardStyle}>
      <TouchableOpacity onPress={onNameTap}>
      <CardItem style={styles.cardItemStyle} >
        
        <Left>
          <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
            {img ? (
              <Thumbnail source={{ uri: img }} resizeMode="cover" />
            ) : (
              <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
            )}
          </TouchableOpacity>
          <Body >
            <View flexDirection ='column'>
            <Text style={styles.profileName} onPress={onNameTap} >
              {name}
            </Text>
            <Text style={{color:color.GREY,fontSize:15,flex:1}} >
              {lastMessages}
            </Text>
            </View>
          </Body>
        </Left>
        <Right>
            <Text style={{color:color.GREY,fontSize:12}}>{date}</Text>
          <Badge style={styles.Badge}>
            <Text>1</Text>
          </Badge>
        </Right>
      </CardItem>
      </TouchableOpacity>
    </Card>
  );
};

export default ShowUsers;
