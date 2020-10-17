const { RNFirebase } = require("react-native-firebase");
import React, { useState,useContext } from 'react'
import {SafeAreaView,Text, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard} from 'react-native';
import {globalStyle, color,keyboardVerticalOffset} from '../../utility';
import { Logo, InputField, RoundCornerButton } from '../../component';
import { View } from 'native-base';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/types';
import { LoginRequest } from '../../network';

const Login = ({navigation}) =>{

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;
    const [showLogo, toggleLogo] = useState(true);

    const [credential,setCredential] = useState({
        email: '',
        password: '',
    });
    const{email,password} = credential;
    const setInitialState = () => {
        setCredential({ email: '', password: '' });
      };
      
      //login on EmailAuth in Firebase 
   const onLoginPress = () => {
       if(!email){
           alert('Email is required')
       }
       else if(!password){
        alert('Password is required')

       }
       else{
           dispatchLoaderAction({
               type:LOADING_START,
           });
           LoginRequest (email, password)
           .then((res)=>{

            if (!res.additionalUserInfo) {
                dispatchLoaderAction({
                  type: LOADING_STOP,
                });
                alert(res);
                return;
              }               

               dispatchLoaderAction({
                type:LOADING_STOP,
            });
            setInitialState();
            navigation.replace('Dashboard')
           })
           .catch((err)=>{
               dispatchLoaderAction({
                   type:LOADING_STOP,
               });
               alert(err);
           });
       }
    }
      
    const handleOnChange = (name,value) =>{
        setCredential({
            ...credential,
            [name]:value,
        });
    };

    //* on focus input

    const handleFocus = () => {
        setTimeout(()=>{
            toggleLogo(false);
        },200);

    };
    //* on blur input
    
    const handleBlur = () => {
        setTimeout(()=>{
            toggleLogo(true);
        },200);
    }
    
    return(
        <KeyboardAvoidingView
        style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}
        keyboardVerticalOffset={keyboardVerticalOffset}>
       
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
        <SafeAreaView style={[globalStyle.flex1, {backgroundColor: color.BLACK}]}>
           

            <View style={[globalStyle.flex2,globalStyle.containerCentered]}>
            {
                showLogo && (
                <View style={[globalStyle.containerCentered]}>
                <Logo/>
            </View>
            ) }

                <InputField 
                placeholder="Enter Email" 
                value={email.trimEnd()}
                onChangeText = {(text) => handleOnChange('email',text)}
                onFocus={()=>handleFocus()}
                onBlur={()=>handleBlur()}/>

                <InputField 
                placeholder="Enter Password" 
                secureTextEntry={true}
                value={password.trimEnd()}
                onChangeText = {(text) => handleOnChange('password',text)}/>

                <RoundCornerButton title="Login" onPress={() => onLoginPress()}/>
                <Text 
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color:color.LIGHT_GREEN
                }}
                onPress={() =>{
                    setInitialState();
                     navigation.navigate('SignUp')}}>
                    Sign Up
                    </Text>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login ;