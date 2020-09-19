import React from "react";
import { Text } from "react-native";
import { Card, CardItem, Left, Body, Thumbnail, Right } from "native-base";
import styles from "./styles";
import { color } from "../../utility";
import { View } from "react-native-animatable";
import { Icon,Button } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

const ShowCalls = ({ name, img, onImgTap, onNameTap }) => {
  return (
    <Card style={styles.cardStyle}>
      <TouchableOpacity>
      <CardItem style={styles.cardItemStyle}>
        <Left>
          <TouchableOpacity style={[styles.logoContainer]} onPress={onImgTap}>
            {img ? (
              <Thumbnail source={{ uri: img }} resizeMode="cover" />
            ) : (
              <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.profileName} onPress={onNameTap}>
              {name}
            </Text>   
        </Left>
        <Right>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{color:color.WHITE,right:10}}>
        <Button transparent>
          <Icon 
          name="call"
          style={{color:color.WHITE}}
          type="MaterialIcons"
          />
          </Button>
          </TouchableOpacity>
          <TouchableOpacity>
          <Button transparent >
          <Icon 
           name="videocam"
          size={30}
          style={{color:color.WHITE}}
          type="MaterialIcons"
          />
          </Button>
          </TouchableOpacity>
        </View>
        </Right>
      </CardItem>
      </TouchableOpacity>
    </Card>
  );
};

export default ShowCalls;
