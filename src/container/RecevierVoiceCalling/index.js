import React, { useLayoutEffect, Fragment } from 'react'
import {View, Text} from 'react-native'
import { globalStyle, color } from '../../utility'
import { Icon ,Fab} from 'native-base'
import style from './styles'
const RecevierVoiceCalling = ({route,navigation}) =>{
    const {params} = route
    const {name,img} = params;

    useLayoutEffect(()=>{
        navigation.setOptions({
        })
    },[navigation])
    return(
        <Fragment>
            {img ? (
             <ImageBackground source={{uri:img}} style={style.BackgroundImg} resizeMode="cover" imageStyle={{opacity:0.5}}>
             <View style={[globalStyle.containerCentered]} >
                <Text style={style.TextName}>{name}</Text>
                <Text style={style.TextRinning}>Rinning....</Text>
                </View>
                </ImageBackground>  
            ) : (
                <View style={[globalStyle.containerCentered, {backgroundColor:color.BLACK}]}>
                <Text style={style.TextName}>{name}</Text>
                <Text style={style.TextCalling}>Calling...</Text>
                <Text style={style.text}>{name.charAt(0)}</Text>
                <Text style={style.TextNameImage}>{name}</Text>
                </View>
            )}

        <Fab style={style.FabEndCalling} position="bottomRight"  >
           <Icon style={{color:color.WHITE}} name="call" type="MaterialIcons"/>
        </Fab>
        <Fab style={style.FabStartCalling} position="bottomLeft"  >
           <Icon style={{color:color.WHITE}} name="call" type="MaterialIcons"/>
        </Fab>
        </Fragment>
    )
}

export default RecevierVoiceCalling;