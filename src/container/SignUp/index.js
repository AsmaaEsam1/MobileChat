import React, { useState, useContext } from 'react'
import {SafeAreaView,Text,KeyboardAvoidingView,keyboardVerticalOffset,TouchableWithoutFeedback,Keyboard} from 'react-native';
import {globalStyle, color} from '../../utility';
import { Logo, InputField, RoundCornerButton } from '../../component';
import { View } from 'native-base';
import { Store } from '../../context/store';
import { LOADING_START, LOADING_STOP } from '../../context/actions/types';
import { SignUpRequest, AddUser } from '../../network';
import firebase from 'react-native-firebase'

const SignUp = ({navigation}) =>{

    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;
    const [showLogo, toggleLogo] = useState(true);
    const [credentials,setCredentials] = useState({
        name:'',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber:'',
    });
    
    const { email, password, confirmPassword, name } = credentials;
    
    const setInitialState = () => {
        setCredentials({name: '', email: '', password: '', confirmPassword: '' });
      };
    
   const onSignUpPress = () => {
    if(!name){
        alert('Name is required')
    }
      else if(!email){
           alert('Email is required')
       }
       else if(!password){
        alert('Password is required')
       }
       else if(password !== confirmPassword){
        alert("Password didn't match")
       }
       else{
           dispatchLoaderAction({
               type:LOADING_START,
           });
           SignUpRequest(email,password)
           .then((res) => {
            if (!res.additionalUserInfo) {
              dispatchLoaderAction({
                type: LOADING_STOP,
              });
              alert(res);
              return;
            }               
               console.log(firebase.auth().currentUser)
               let uid = firebase.auth().currentUser.uid;
              let profileImg = '';
               AddUser(name, email, uid, profileImg)
               
                navigation.navigate('Dashboard');
               })
               .catch((err)=>{
                dispatchLoaderAction({
                    type:LOADING_STOP,
                });
                alert(err)
            })
           .catch((err)=>{
               dispatchLoaderAction({
                   type:LOADING_STOP,
               });
               alert(err)
           });
       }
    }
    const handleOnChange = (name,value) =>{
        setCredentials({
            ...credentials,
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
                    showLogo &&(
                    <View style={[globalStyle.containerCentered]}>
                    <Logo/>
                </View>
                    )}
        
            <InputField
              placeholder="Enter name"
              value={name}
              onChangeText={(text) => handleOnChange("name", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Enter email"
              value={email.trimEnd()}
              onChangeText={(text) => handleOnChange("email", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            
            <InputField
              placeholder="Enter password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => handleOnChange("password", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />
            <InputField
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(text) => handleOnChange("confirmPassword", text)}
              onFocus={() => handleFocus()}
              onBlur={() => handleBlur()}
            />

            <RoundCornerButton
              title="Sign Up"
              onPress={() => onSignUpPress()}
            />
                <Text 
                style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color:color.LIGHT_GREEN
                }}
                onPress={() => {
                setInitialState();
                navigation.navigate('Login')}}>
                    Login
              </Text>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
       </KeyboardAvoidingView>
    );

                }
export default SignUp