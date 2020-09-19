import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail } from "native-base";
import styles from "./styles";

const ShowAllUsers = ({ name, img, onImgTap, onNameTap }) => {
  return (
    <Card style={styles.cardStyle}>
      <TouchableOpacity onPress={onNameTap}>
      <CardItem style={styles.cardItemStyle}>
        <Left>
          <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
            {img ? (
              <Thumbnail source={{ uri: img }} resizeMode="cover" />
            ) : (
              <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
            )}
          </TouchableOpacity>
          <Body>
            <Text style={styles.profileName} >
              {name}
            </Text>
          </Body>
        </Left>
       
      </CardItem>
      </TouchableOpacity>
    </Card>
  );
};

export default ShowAllUsers;
