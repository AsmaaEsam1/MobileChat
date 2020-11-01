import React,{useLayoutEffect, useContext, useState,useEffect} from 'react'
import {Text,View, SafeAreaView,FlatList} from 'react-native'
import { color, globalStyle } from '../../utility'
import {ShowUsers,ShowCalls, ShowAllUsers} from '../../component'
import { Store } from '../../context/store'
import {LOADING_START,LOADING_STOP} from '../../context/actions/types'
import firebase from 'react-native-firebase'
import {smallDeviceHeight} from '../../utility/constants'
import { deviceHeight } from '../../utility/styleHelper/appStyle'
import { Button, Icon, Tab, Tabs, TabHeading, Badge, Fab,} from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from 'moment/min/moment-with-locales.min'
import{ Menu, 
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuContext,
  renderers,
} from 'react-native-popup-menu';
import style from './styles'

const { SlideInMenu } = renderers;

export default ({navigation}) => {
const uuid = firebase.auth().currentUser.uid;  
const globalState = useContext(Store)
const {dispatchLoaderAction} = globalState
const [getScrollPosition, setScrollPosition] = useState(0);
const [allUsers, setAllUsers] = useState([]);
const [lastMessage, setLastMessage] = useState([]);
let currentDate = moment(new Date()).format('ll').toUpperCase()
useLayoutEffect(() => {
      try{
        navigation.setOptions({
          headerStyle: {backgroundColor: color.DARK_GRAY},
            headerTitle:
             <Text style={{right:200}}></Text>,
             headerLeft: () => (
              <Text style={style.TextScreen} >Dashboard</Text>
             ),
          headerRight: () => (  
            <View flexDirection= "row" > 
            <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <Button transparent>
            <Icon type="MaterialIcons" name ="search" style= {{color:color.WHITE}}/>
            </Button>
            </TouchableOpacity>
            <TouchableOpacity>
            <Button transparent>
          
          <MenuProvider style={{ flexDirection: 'row'}} style={{width:80}}>
            <Menu name="numbers" renderer={SlideInMenu} opened0={true} >
              <MenuTrigger triggerTouchable={{activeOpacity: 1,}}>
                <Icon
                  type="MaterialIcons"
                  name="more-vert"
                  style= {{color:color.WHITE}}
                />
              </MenuTrigger>
              <MenuOptions>
            <MenuOption value={"Settings"} >
              <Text onPress={()=>{navigation.navigate('Settings')}}>Settings</Text>
            </MenuOption>
              </MenuOptions>
            </Menu>
          </MenuProvider>
      
          </Button>
          </TouchableOpacity>
          </View>
           )
        });
      }catch(err){
        console.log(err)
      }
    },[navigation]);

 useEffect(() => {
   
     //show all users in Real-time database
        try{
          dispatchLoaderAction({
            type: LOADING_START,
          });
          let users = [];
          let lastMsg = [];
          dispatchLoaderAction({
            type: LOADING_START,
          });
          firebase.database()
          .ref('users')
          .on('value',(dataSnapshot)=>{
            dataSnapshot.forEach((child, i)=>{
              if(uuid !== child.val().uuid ){
                users.push({
                 id: child.val().uuid,
                 name: child.val().name,
                 profileImg: child.val().profileImage,
             })
            }
            
              dispatchLoaderAction({
                type: LOADING_START,
              });
           firebase.database()
        .ref('messages')
        .child(uuid)
        .child(child.val().uuid)
        .orderByChild('createdAt')
        .on('value',(dataSnapshot)=>{ 
          dataSnapshot.forEach((childs)=>{  
            let newmessage = {
            id: child.val().uuid,
            name: child.val().name,
            profileImg: child.val().profileImage,
            reciever:childs.val().message.reciever,
            lastMssg:childs.val().message.msg,
            createdAt:childs.val().message.createdAt,
            dates:childs.val().message.date,
            }
            lastMsg = lastMsg.filter(function(obj){
                return obj.name != newmessage.name
            }) 
          lastMsg.push(newmessage)
          setLastMessage(lastMsg)
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          })     
          })     
        })
          })  
          setAllUsers(users);
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
        }catch(error){
          dispatchLoaderAction({
            type: LOADING_STOP,
          });
          alert(error)
        }
        
      }, [navigation])
      
      // * ON IMAGE TAP
    
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
   
    // * ON NAME TAP 
  
    const nameTap = (profileImg,name,guestUserId) =>{
      if(!profileImg){
        navigation.navigate('Chat',{
          name,
          imgText:name.charAt(0),
          guestUserId,
          currentUserId:uuid
        })
      }
      else{
        navigation.navigate('Chat',{
          name,
          img:profileImg,
          guestUserId,
          currentUserId:uuid
        })
      }
    }
    // * GET OPACITY
    const getOpacity = () =>{
      if(deviceHeight<smallDeviceHeight){
        return deviceHeight/4;
      }
      else{
        return deviceHeight/6;
      }
    }

    return(     
     
        <SafeAreaView style={[globalStyle.flex1,{backgroundColor:color.BLACK}]}>
           
           
           <Tabs initialPage={0} tabBarBackgroundColor={color.BLACK} 
        tabBarUnderlineStyle={{height:1}}
        tabContainerStyle={{elevation:0}}>
     <Tab 
     style={[globalStyle.flex1,{backgroundColor:color.BLACK}]}
     heading={
       <TabHeading style={style.TabBackgroundColor}>
         <Text style={style.Text}>CHATS</Text>
         <Badge style={style.BadgeChat}>
           <Text style={style.BadgeText}>2</Text>
         </Badge>
       </TabHeading>}>
          <FlatList
          data= {lastMessage}
          keyExtractor={(_, index)=>index.toString()}
          onScroll={(event)=> setScrollPosition(event.nativeEvent.contentOffset.y)}
          ListHeaderComponent={
            <View
            style={{
              opacity: getScrollPosition < getOpacity() 
              ? (getOpacity()-getScrollPosition) / 100
               : 0,
            }}>
          
           </View>
          }
          renderItem={({item})=>(
            <ShowUsers
            name={item.name} img={item.profileImg}
            onImgTap={()=>imgTap(item.profileImg,item.name)}
            onNameTap={()=>nameTap(item.profileImg,item.name,item.id)}
            lastMessages={item.lastMssg}
            date={item.dates == currentDate ? date= item.createdAt : date= item.dates}
            />
    )}
          />
          <Fab style={style.FabChat} position="bottomRight" onPress={()=>navigation.navigate('Search')}>
            <Icon style={{color:color.BLACK}} name="chat" type="MaterialIcons"/>
          </Fab>
     </Tab>

     <Tab style={[globalStyle.flex1,{backgroundColor:color.BLACK}]}
     heading={
       <TabHeading style={style.TabBackgroundColor}>
         <Text style={style.Text}>CALLS</Text>
      </TabHeading>}>  
          <FlatList
          alwaysBounceVertical = {false}
          data= {allUsers}
          keyExtractor={(_, index)=>index.toString()}
          onScroll={(event)=> setScrollPosition(event.nativeEvent.contentOffset.y)}
          ListHeaderComponent={
            <View
            style={{
              opacity: getScrollPosition < getOpacity() 
              ? (getOpacity()-getScrollPosition) / 100
               : 0,
            }}>
           </View>
          }
          renderItem={({item})=>(
            <ShowCalls name={item.name} img={item.profileImg}
            onImgTap={()=>imgTap(item.profileImg,item.name)}
            //onNameTap={()=>nameTap(item.profileImg,item.name,item.id)}
            />
          )}
          />
      </Tab>
     <Tab 
     style={[globalStyle.flex1,{backgroundColor:color.BLACK}]}
     heading={
       <TabHeading style={style.TabBackgroundColor}>
         <Text style={style.Text}>CONTACTS</Text>
       </TabHeading>}>
          <FlatList
          alwaysBounceVertical = {false}
          data= {allUsers}
          keyExtractor={(_, index)=>index.toString()}
          onScroll={(event)=> setScrollPosition(event.nativeEvent.contentOffset.y)}
          ListHeaderComponent={
            <View
            style={{
              opacity: getScrollPosition < getOpacity() 
              ? (getOpacity()-getScrollPosition) / 100
               : 0,
            }}>
           </View>
          }
          renderItem={({item})=>(
            <ShowAllUsers name={item.name} img={item.profileImg}
            onImgTap={()=>imgTap(item.profileImg,item.name)}
            onNameTap={()=>nameTap(item.profileImg,item.name,item.id)}
            />
          )}/>           
     </Tab>
    </Tabs>  
  </SafeAreaView>
    );
}

