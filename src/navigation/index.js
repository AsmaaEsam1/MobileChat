import * as React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import{Login, SignUp, Dashboard, Splash,Search, ShowFullImg,Chat,Settings,SenderVoiceCalling,RecevierVoiceCalling} from '../container'
import { color } from '../utility'


const Stack = createStackNavigator();
function NavContainer(){
    return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash"
        screenOptions ={{
            headerShown: true,
            headerStyle: {backgroundColor: color.DARK_GRAY},
            headerTintColor: color.WHITE,
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
            },
        }} >
            
        <Stack.Screen name="Splash" component={Splash} options={{
            headerShown:false
        }}/>
        <Stack.Screen name="Login" component={Login} options={{
            headerShown:false
        }}/>
        <Stack.Screen name="SignUp" component={SignUp}   options={{
            headerShown:false}}/>
        <Stack.Screen name="Dashboard" component={Dashboard}
        options={{headerLeft: null}}
        />
         <Stack.Screen name="ShowFullImg" component={ShowFullImg}
        options={{headerBackTitle: null}}
        />
         <Stack.Screen name="Chat" component={Chat}
        options={{headerTitle:''}}
        />
        <Stack.Screen name="Settings" component={Settings}
        options={{headerBackTitle: null}}
        />
        <Stack.Screen name="SenderVoiceCalling" component={SenderVoiceCalling}
        options={{headerShown: false}}
        />
         <Stack.Screen name="RecevierVoiceCalling" component={RecevierVoiceCalling}
        options={{headerShown: false}}
        />
        <Stack.Screen name="Search" component={Search}
        options={{headerShown:false}}
        />
        </Stack.Navigator>
        </NavigationContainer>
    );
}

export default NavContainer;