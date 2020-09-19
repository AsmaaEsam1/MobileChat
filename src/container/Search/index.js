import React,{useContext, useState, useEffect} from 'react'
import {View, SafeAreaView,FlatList,StyleSheet} from 'react-native'
import { color, globalStyle } from '../../utility'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Store } from '../../context/store'
import{Header, Icon, Input, Item, Right} from 'native-base'
import {LOADING_START,LOADING_STOP} from '../../context/actions/types'
import firebase from 'react-native-firebase'
import { ShowAllUsers } from '../../component'
import {smallDeviceHeight} from '../../utility/constants'
import { deviceHeight } from '../../utility/styleHelper/appStyle'

const Search = ({navigation}) => {

const uuid = firebase.auth().currentUser.uid;  
const globalState = useContext(Store)
const {dispatchLoaderAction} = globalState
const [getScrollPosition, setScrollPosition] = useState(0);
const [state, setState] = useState({ data: []})
const [data, setData] = useState([]);
const [text, setText] = useState('');

   React.useEffect(() => {
        dispatchLoaderAction({
          type: LOADING_START,
        });
        try{

          // Get all users from Real-time database in firebase

          firebase.database()
          .ref('users')
          .on('value',(dataSnapshot)=>{
            let users = [];
            dataSnapshot.forEach((child)=>{
              if(uuid !== child.val().uuid){
               
                users.push({
                  id: child.val().uuid,
                  name: child.val().name,
                  profileImg: child.val().profileImage,
                })
              }
            })
            setData(users)
            setState(users)
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
    
      //Make search in Flatlist

      const searchData = text ? data.filter(item => {
        const itemData = item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
    : data;
      
      const itemSeparator = () => {
        return (
          <View
            style={{
              height: 0.5,
              width: "100%",
              backgroundColor: "#000",
            }} />
        );

      };
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
      // * GET OPACITY

      const getOpacity = () =>{
        if(deviceHeight<smallDeviceHeight){
          return deviceHeight/4;
        }
        else{
          return deviceHeight/6;
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
      return (
        <SafeAreaView style={[globalStyle.flex1,{backgroundColor:color.BLACK}]}>

        <View style={[globalStyle.flex1,{backgroundColor:color.BLACK}]}> 
            <View style={styles.MainContainer}>
        <Header searchBar rounded style={{backgroundColor:'#000'}}>
          <Item>
          <TouchableOpacity onPress={()=>{navigation.replace('Dashboard')}}>
                <Icon name ="arrow-back" style={{color:color.BLACK}}/>
          </TouchableOpacity>
            <Icon name="search" />
            <Input  style={styles.textInput}
            onChangeText={text => setText(text)}
            value={text}
            underlineColorAndroid="transparent"
            placeholder="Search Here"
            />
            <Icon name="people" />
          </Item>
        </Header>
           
            <FlatList
              style={{marginTop:10}}
                data={searchData}
                keyExtractor={(_, index) => index.toString()}
                ItemSeparatorComponent={itemSeparator}
                onScroll={(event)=> setScrollPosition(event.nativeEvent.contentOffset.y)}
                ListHeaderComponent={
                  <View
                  style={{
                    opacity: getScrollPosition < getOpacity() 
                    ? (getOpacity()-getScrollPosition) / 100: 0,}}>
                
                 </View>
                }
                renderItem={({item})=>(
                  <ShowAllUsers name={item.name} img={item.profileImg}
                  onImgTap={()=>imgTap(item.profileImg,item.name)}
                  onNameTap={()=>nameTap(item.profileImg,item.name,item.id)}
                  />
                )}
              />
            </View>
           </View>
           </SafeAreaView>
          )          
       
}


const styles = StyleSheet.create({
    MainContainer: {
      justifyContent: "center",
      flex: 1,
      backgroundColor:color.BLACK,
    },
  
    row: {
      fontSize: 18,
      padding: 12,
    },
  
    textInput: {
        alignContent:'flex-start',
        alignItems:'flex-start',
        direction:'inherit',
      textAlign: "center",
      height: 42,
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 8,
      backgroundColor: "#FFFF",
    },
  });
export default Search