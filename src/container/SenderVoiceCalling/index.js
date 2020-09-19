import React, { useLayoutEffect, Fragment } from 'react'
import {View, Text,Image,StyleSheet, ImageBackground} from 'react-native'
import { globalStyle, color } from '../../utility'
import { Icon ,Fab} from 'native-base'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import style from './styles'
const SenderVoiceCalling = ({route,navigation}) =>{
    const {params} = route
    const {name,img} = params;

    useLayoutEffect(()=>{
        navigation.setOptions({
        })
    },[navigation])
    return(
        <Fragment>
            {img ? ( 
            <ImageBackground source={{uri:img}} style={style.BackgroundImg} resizeMode="cover" imageStyle={{opacity:0.5}} >
            <View style={[globalStyle.containerCentered]} >
                <Text style={style.TextName}>{name}</Text>
                <Text style={style.TextRinning}>Rinning....</Text>
                </View>
                </ImageBackground>  
            ) : (
                <View style={[globalStyle.containerCentered, {backgroundColor:color.BLACK}]}>
                <Text style={style.TextName}>{name}</Text>
                <Text style={style.TextRinning}>Rinning....</Text>

                <Text style={style.text}>{name.charAt(0)}</Text>
                <Text style={style.TextNameImage}>{name}</Text>

                </View>
            )}

        <Fab style={style.FabEndCalling} position="bottomRight"  >
           <Icon style={{color:color.WHITE}} name="call" type="MaterialIcons"/>
        </Fab>
        <Fab style={style.FabVideo} position="bottomLeft" >
           <Icon style={{color:color.WHITE}} name="videocam" type="MaterialIcons"/>
        </Fab >
        <Fab style={style.FabMic}>
           <MaterialCommunityIcons
            name = "microphone"
            color={color.WHITE}
            size={35}  />
        </Fab>
        <Fab style={style.FabVolumHigh}>
           <Icon
            name = "volume-high"
            color={color.WHITE}
            size={35}/>
        </Fab>
    </Fragment>
    )
}

export default SenderVoiceCalling;