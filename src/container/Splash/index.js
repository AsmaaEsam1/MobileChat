import React, { useEffect } from 'react'
import {View,Text} from 'react-native'
import {Logo} from '../../component'
import {globalStyle, color} from '../../utility' 
import firebase from 'react-native-firebase'
const Splash = ({navigation}) => {

   React.useEffect(()=>{
        
         setTimeout(function() {
            
            firebase.auth().onAuthStateChanged(function(user) {
                console.log(user)
                if (user === null) {
                 // No user is signed in.
                    navigation.reset({
                        index:0,
                        routes: [{name: 'Login'}]                 
                    })                   
                } else {
                  //  user is signed in.
                  navigation.reset({
                    index:0,
                    routes: [{name: 'Dashboard'}]  
                })
                }
              });
            
  
        }, 3000);  
    },[navigation])
    

    return(
        <View style={[globalStyle.containerCentered, {backgroundColor:color.BLACK}]}>
            <Logo/>
        </View>
    );
};

export default Splash;