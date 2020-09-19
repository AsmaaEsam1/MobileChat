import React,{useLayoutEffect, useContext, useState, useEffect, Fragment} from 'react'
import {Text,View, Alert, SafeAreaView,FlatList, Image} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { LogOutUser, UpdateUser } from '../../network'
import{Profile} from '../../component'
import {LOADING_START,LOADING_STOP} from '../../context/actions/types'
import firebase from 'react-native-firebase'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { color, globalStyle } from '../../utility'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Store } from '../../context/store'
import{Button, Icon} from 'native-base'

const Settings = ({navigation}) =>{
  const uuid = firebase.auth().currentUser.uid;  
  const globalState = useContext(Store)
  const {dispatchLoaderAction} = globalState
  const [userDetail, setUserDetail] = useState({
    id: '',
    name: '',
    profileImg: '',
  });
  const {name, profileImg } = userDetail;

  useLayoutEffect(() => {
      
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity  style={{ right: 10 }}>
            <Button transparent>
            <SimpleLineIcons
              name="logout"
              size={26}
              color={color.WHITE}
              onPress={() =>
                Alert.alert(
                  "Logout",
                  "Are you sure to log out",
                  [{
                      text: "Yes",
                      onPress: () => logout(),
                    },
                    {
                      text: "No",
                    },
                  ],
                  { cancelable: false }
                )} />
            </Button>
            </TouchableOpacity>
            ),
            headerLeft: () => (
                <TouchableOpacity onPress={()=>{navigation.replace('Dashboard')}}>
                <Button transparent>
                <Icon name ="arrow-back" style={{color:color.WHITE}}/>
                </Button>
                </TouchableOpacity>
            )
    })
    }, [navigation])

 React.useEffect(() => {
        try{
          //Get current user from Real-time database in firebase
          firebase.database()
          .ref('users')
          .on('value',(dataSnapshot)=>{
            let currentUser = {
              id: '',
              name: '',
              profileImg: '',
            };
            dataSnapshot.forEach((child)=>{
              if(uuid == child.val().uuid){
                currentUser.id = uuid;
                currentUser.name = child.val().name;
                currentUser.profileImg = child.val().profileImage;
              }
            })
            setUserDetail(currentUser);
            dispatchLoaderAction({
              type: LOADING_STOP,
            });
          })

        }catch(error){
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(error)
        }
        
      }, []);

    //update profile image
      const selectImage = () => {
        const options = {
          storageOptions: {
            skipBackup: true
                    }
        };
        var metadata = {
          contentType: 'image/jpeg',
        };
        ImagePicker.showImagePicker(options, response => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            let source = response.uri;
            var imageName = response.fileName
            var storage = firebase.storage();
            var storageRef = storage.ref(imageName);
            var uploadTask = storageRef.put(source, metadata);

            //uploade image to Storage in firebase
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
            }, function(error) {
          
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          }, function() {
            // Upload completed successfully, now we can get the download URL
           storageRef.getDownloadURL().then(result => {
              console.log(result)
              source = result;
              UpdateUser(uuid, source)
              .then(() => {
                setUserDetail({
                  ...userDetail,
                  profileImg: source,
                });
                dispatchLoaderAction({
                  type: LOADING_STOP,
                });
              })
              .catch(() => {
                alert(err);
                dispatchLoaderAction({
                  type: LOADING_STOP,
                });
              });
            }
              );  
          });
        }
      });
    };
           
    const logout = () => {
        LogOutUser()
      
           .then(()=>{
                navigation.replace('Login')
            })
            .catch((err)=> alert(err))
    
  }
  //* img Tap To show image in full screen

  const imgTap = (profileImg, name) =>{
    if(!profileImg){
      navigation.navigate('ShowFullImg',{
        name,
        imgText:name.charAt(0),
      })
    }
    else{
      navigation.navigate('ShowFullImg',{
        name,
        img:profileImg,
      })
    }
  }
  return(     
     
    <SafeAreaView style={[globalStyle.flex1,{backgroundColor:color.BLACK}]}>
        <Fragment>
            <Profile
              img={profileImg}
              onImgTap={() => imgTap(profileImg, name)}
              onEditImgTap={() => selectImage()}
              name={name}
            />      
        </Fragment>
    </SafeAreaView>
  )
}

export default Settings;