import React,{useLayoutEffect, useState, useEffect, Fragment} from 'react'
import {View,Text,SafeAreaView,FlatList, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, TouchableHighlightComponent, PermissionsAndroid} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyle, color, appStyle} from '../../utility';
import styles from './styles'
import { InputField,ChatBox } from '../../component';
import{senderMsg,recieverMsg} from '../../network'
import firebase from 'react-native-firebase';
import { Button,Icon, Thumbnail} from 'native-base'
import { deviceHeight } from "../../utility/styleHelper/appStyle";
import { smallDeviceHeight } from "../../utility/constants";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

const Chat = ({route, navigation}) => {
    const {params} = route;
    const {name, img, imgText, guestUserId, currentUserId} = params;
    const [msgValue, setMsgValue] = useState('');
    const [messages, setMessages] = useState([]);
    useLayoutEffect(()=>{
        navigation.setOptions({
        headerLeft: () => (
          <View flexDirection= "row" >
          <TouchableOpacity onPress={()=>{navigation.replace('Dashboard')}}>
                <Button transparent>
                <Icon name ="arrow-back" style={{color:color.WHITE}}/>
                </Button>
                 </TouchableOpacity>
          <View style={[styles.logoContainer]} >
             {img ? (
              <Thumbnail style={{width:40,height:40}} source={{ uri: img }} resizeMode="cover" />
            ) : (
              <Text style={styles.thumbnailName}>{name.charAt(0)}</Text>
            )}
            </View>
            <Text style={{fontSize: 20, color: color.WHITE, fontWeight: "bold" , width:"100%",margin:5}} >{name}</Text>
        </View>
        ),
        headerRight: () => (
            <View flexDirection= "row" >
               
            <TouchableOpacity onPress={() =>{nameTap()}}> 
            <Button transparent>
            <Icon type="MaterialIcons" name ="call" size = {50} style= {{color:color.WHITE}}/>
            </Button>
            </TouchableOpacity>
            <TouchableOpacity> 
            <Button transparent >
            <Icon type="MaterialIcons" name ="videocam"  style={{ right: 10 , color: color.WHITE}}/>
            </Button>  
            </TouchableOpacity>        
            </View>
            )
        });
    },[navigation])

   React.useEffect(()=>{
        try {
          //connected to real-time database and sent messages
            firebase.database()
            .ref('messages')
            .child(currentUserId)
            .child(guestUserId)
            .on('value',(dataSnapshot)=>{
                let msgs = [];
                dataSnapshot.forEach((child)=>{
                    msgs.push({
                        sendBy:child.val().message.sender,
                        recievedBy:child.val().message.reciever,
                        msg:child.val().message.msg,
                        img:child.val().message.img,
                        createdAt:child.val().message.createdAt,
                    });
                });
                setMessages(msgs.reverse());
            });
        } catch (error) {
            alert(error)
        }
    },[])
    //send and recevied messages bettween different users 
const handleSend = () =>{
  
  setMsgValue('')
    if(msgValue){
      senderMsg(msgValue, currentUserId, guestUserId,'')
      .then(()=>{})
      .catch((err)=>alert(err))

      // * guest user
     recieverMsg(msgValue, currentUserId, guestUserId,'')
      .then(()=>{})
      .catch((err)=>alert(err))
    }
}
// recording voice and send to real time database
const startRecord =async  () => {
//check permission in android External Storage
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the storage');
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
  //check permission in android Record Audio

  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Permissions for write access',
          message: 'Give permission to your storage to write a file',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('permission denied');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
}
//get uri of image and send or recevie img in real-time database
    const handleCamera = () => {
        const option = {
          storageOptions: {
            skipBackup: true,
          },
        };
    
        ImagePicker.showImagePicker(option, (response) => {
          if (response.didCancel) {
            console.log("User cancel image picker");
          } else if (response.error) {
            console.log(" image picker error", response.error);
          } else {
            // get uri
            let source = response.uri;
    
            senderMsg(msgValue, currentUserId, guestUserId, source)
              .then(() => {})
              .catch((err) => alert(err));
    
            // * guest user
    
            recieverMsg(msgValue, currentUserId, guestUserId, source)
              .then(() => {})
              .catch((err) => alert(err));
          }
        });
      }; 

      const handleOnChange = (text) =>{
        setMsgValue(text);
    }

    // * On img Tap
    const imgTap = (chatImg) => {
      navigation.navigate('ShowFullImg', {name, img:chatImg})
    }
    // On name Tap
    const nameTap = () => {
      navigation.navigate('SenderVoiceCalling', {name,img})
    }

      return(
        <SafeAreaView style={[globalStyle.flex1, {backgroundColor:color.BLACK}]}>
          <KeyboardAvoidingView keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100:70}
            style={[globalStyle.flex1, {backgroundColor:color.BLACK}]}
            >
          <TouchableWithoutFeedback style={[globalStyle.flex1]} onPress={Keyboard.dismiss}>
            <Fragment>
        <FlatList
        inverted
        data={messages}
        keyExtractor={(_, index)=>index.toString()}
        renderItem={({item})=>(

        <ChatBox
        msg={item.msg}
        userId={item.sendBy}
        date= {item.createdAt}
        img={item.img}
        onImgTap={()=> imgTap(item.img)}
        />
        
            )}
        />   
        {/*Send Message*/} 
        <View style={styles.sendMessageContainer}>
            <InputField
            placeholder = "Type Here"
            numberOfLines={10}
            inputStyle={styles.input}
            value={msgValue}
            onChangeText={(text)=>handleOnChange(text)}
            />
        <View style={styles.sendBtnContainer}>
          <TouchableOpacity onPress={()=>startRecord()}>
            <MaterialCommunityIcons
            name = "microphone"
            color={color.WHITE}
            size={35}
            
            />
          </TouchableOpacity>
        
          <TouchableOpacity onPress={()=>handleCamera()}>

            <MaterialCommunityIcons
            name = "attachment"
            color={color.WHITE}
            size={35}
            
            />
             </TouchableOpacity>
             <TouchableOpacity   onPress={()=>handleSend()}>

             <MaterialCommunityIcons
                  name="send-circle"
                  color={color.WHITE}
                  size={35}
                
                />
             </TouchableOpacity>
        </View>
        </View>
        </Fragment>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
};
export default Chat;