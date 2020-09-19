import React from "react";
import { Text } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail, Right, Badge } from "native-base";
import styles from "./styles";
import { color } from "../../utility";
import { TouchableOpacity } from "react-native-gesture-handler";


const ShowUsers = ({ name, img,date, onImgTap, onNameTap }) => {
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
          <Body>
            <Text style={styles.profileName} onPress={onNameTap} >
              {name}
            </Text>
          </Body>
        </Left>
        <Right>
            <Text style={{color:color.WHITE}}>{date}</Text>
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
