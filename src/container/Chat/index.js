import React,{ useState, Fragment,useLayoutEffect,useEffect} from 'react'
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
import { AudioUtils} from 'react-native-audio';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment/min/moment-with-locales.min'
import { it } from 'date-fns/locale';

 let audioRecorderPlayer = new AudioRecorderPlayer();
 const Chat = ({route, navigation}) => {
    const {params} = route;
    const {name, img, imgText, guestUserId, currentUserId} = params;
    const [msgValue, setMsgValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [recordTime,setRecordTime] = useState('')
    const [recordSecs,setRecordSecs] = useState(0)
    const [currentPositionSec, setCurrentPositionSec]=useState(0)
    const [currentDurationSec,setCurrentDurationSec] = useState(0)
    const [playTime,setPlayTime] = useState('00:00')
    const [duration,setDuration] = useState('00:00')
    const [active,setActive] = useState([])
    const [startrecord,setStartRecord] = useState(true)
    const [startplay,setStartPlay] = useState(true)
    const [multiDate,setMultiDate] = useState('')
    const [currentMsg, setCurrentMsg] = useState([])
    let num = new Date().getTime();
    const path = AudioUtils.DocumentDirectoryPath+ '/test'+num+'.m4a';
    audioRecorderPlayer.setSubscriptionDuration(0.09);
    let msgs = [];

  useLayoutEffect(()=>{
        navigation.setOptions({
        headerLeft: () => (
          <View flexDirection= "row" >
          <TouchableOpacity onPress={()=>{navigation.navigate('Dashboard')}}>
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
               
            <TouchableOpacity onPress={() =>{callTap()}}> 
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


  useEffect(()=>{
        try {
          //connected to real-time database and sent messages
            firebase.database()
            .ref('messages')
            .child(currentUserId)
            .child(guestUserId)
            .orderByChild('createdAt')
            .on('value',(dataSnapshot)=>{
                let date = [];
                let allData =[];
                let msgs = [];
                dataSnapshot.forEach((child)=>{
                  
                    msgs.push({
                        sendBy:child.val().message.sender,
                        recievedBy:child.val().message.reciever,
                        msg:child.val().message.msg,
                        img:child.val().message.img,
                        audio:child.val().message.audio,
                        audioDuration:child.val().message.audioDuration,
                        createdAt:child.val().message.createdAt,
                        dates:child.val().message.date,
                    });
                    
                });
                setMessages(msgs.reverse());
                let itemDate = messages.map(item => item.dates)
            setMultiDate(msgs.map((item) => item.dates)[msgs.length-1])
            console.log(multiDate)
            });
           

        } catch (error) {
            alert(error)
        }
    },[])
    //send and recevied messages bettween different users 
const handleSend = () =>{  
  setMsgValue('')
    if(msgValue){
      senderMsg(msgValue, currentUserId, guestUserId,'','','')
      .then(()=>{})
      .catch((err)=>alert(err))

      // * guest user
     recieverMsg(msgValue, currentUserId, guestUserId,'','','')
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
  const uri = await audioRecorderPlayer.startRecorder(path).catch(err => console.log(err.message));
  audioRecorderPlayer.addRecordBackListener((e) => {
     setRecordSecs( e.current_position)
     setRecordTime( audioRecorderPlayer.mmss(Math.floor(e.current_position / 1000)))
  });
  console.log(`uri: ${uri}`);
  setStartRecord(false)
}
const onStopRecord = async () => {
  const result = await audioRecorderPlayer.stopRecorder().catch(err => console.log(err.message));
  audioRecorderPlayer.removeRecordBackListener();
  setRecordSecs(0)
  setRecordTime('')
  setStartRecord(true)
  console.log(result);
  senderMsg(msgValue, currentUserId, guestUserId, '',result, recordTime)
  .then(() => {})
  .catch((err) => alert(err));

// * guest user
recieverMsg(msgValue, currentUserId, guestUserId, '',result, recordTime)
  .then(() => {})
  .catch((err) => alert(err));
}

const onStartPlay = async (audioPath,item) => {
  console.log('onStartPlay');
  setActive(item)
  setStartPlay(false)
  const msg = await audioRecorderPlayer.startPlayer(audioPath).catch(err =>console.log(err));
  audioRecorderPlayer.setVolume(1.0);
  console.log(msg);
 audioRecorderPlayer.addPlayBackListener((e) => {
    if (e.current_position === e.duration) {
      console.log('finished');
      audioRecorderPlayer.stopPlayer().catch(err => console.log(err.message));
      setStartPlay(true)
    } 
  
      setCurrentPositionSec(e.current_position)
      setPlayTime( audioRecorderPlayer.mmss(Math.floor(e.current_position / 1000)))
      setCurrentDurationSec (e.duration)
      setDuration ( audioRecorderPlayer.mmss(Math.floor(e.duration / 1000)))  
  });
};

const onPausePlay = async (e) => {
  setStartPlay(true)
  await audioRecorderPlayer.pausePlayer().catch(err => console.log(err));
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
    
            senderMsg(msgValue, currentUserId, guestUserId, source,'')
              .then(() => {})
              .catch((err) => alert(err));
    
            // * guest user
    
            recieverMsg(msgValue, currentUserId, guestUserId, source,'')
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
    // On start Calling Tap
    const callTap = () => {
      navigation.navigate('SenderVoiceCalling', {name,img})
    }
    const renderChat = (item)=>{
      if(item.dates != multiDate){
        setMultiDate(item.dates)
      }
       return(
       <View>
         {   
          <Text style = {{color:color.WHITE ,alignSelf:'center'}}>{item.dates}</Text> 
    }

    <ChatBox
    msg={item.msg}
    userId={item.sendBy}
    date= {item.createdAt}
    img={item.img}
    onImgTap={()=> imgTap(item.img)}
    onAudioTap={()=>onStartPlay(item.audio,item) }
    onAudioPause={()=>onPausePlay()}
    playTimes= {active == item ?
      playTimes = playTime :
      playTimes= item.audioDuration}

    show={active == item ?
        show = startplay: show= true
         }/>
     </View>)
    }

    

      return (
        
        <SafeAreaView style={[globalStyle.flex1, {backgroundColor:color.BLACK}]}>
          <KeyboardAvoidingView keyboardVerticalOffset={deviceHeight > smallDeviceHeight ? 100:70}
            style={[globalStyle.flex1, {backgroundColor:color.BLACK}]}
            >
          <TouchableWithoutFeedback style={[globalStyle.flex1]} onPress={Keyboard.dismiss}>
        <Fragment>
        
        <FlatList
        inverted
        data={messages}
        keyExtractor={(indexs)=>indexs}
        renderItem={
          ()=> renderChat()
}/>
         
        {/*Send Message*/} 

        <View style={styles.sendMessageContainer}>
            <InputField
            placeholder = "Type Here"
            numberOfLines={10}
            inputStyle={styles.input}
            value={msgValue}
            onChangeText={(text)=>handleOnChange(text)} />

        <View style={styles.sendBtnContainer}>
        <Text style={{color:color.WHITE,marginRight:10}}>{recordTime}</Text>
         {startrecord ?( <TouchableOpacity onPress={()=>startRecord()}>
            <MaterialCommunityIcons
            name = "microphone"
            color={color.WHITE}
            size={35}/>
          </TouchableOpacity>
          ):(<TouchableOpacity onPress={()=>onStopRecord()}>
            <Icon
            name = "stop-circle-outline"
            style={{color:color.WHITE}} fontSize={35}/>
          </TouchableOpacity>
          )}
          <TouchableOpacity onPress={()=>handleCamera()}>
            <MaterialCommunityIcons
            name = "attachment"
            color={color.WHITE}
            size={35}/>
             </TouchableOpacity>

             <TouchableOpacity   onPress={()=>handleSend()}>
             <MaterialCommunityIcons
                  name="send-circle"
                  color={color.WHITE}
                  size={35} />
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