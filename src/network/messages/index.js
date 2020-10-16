import { format } from 'date-fns';
import firebase from 'react-native-firebase'
import moment from 'moment/min/moment-with-locales.min'

export const senderMsg = async(msgValue, currentUserId, guestUserId, img, audio,audioDuration) => {
    try {   
        return  firebase 
        .database()
        .ref('messages/'+ currentUserId)
        .child(guestUserId)
        .push({
            message:{
            sender: currentUserId,
            reciever:guestUserId,
            msg: msgValue,
            img:img,
            audio:audio,
            audioDuration:audioDuration,
            createdAt: format(new Date().getTime() ,'h:mm a'),
            date:moment(new Date()).format('ll').toUpperCase(),
            }
        })
    } catch (error) {
        return error
    }
};

export const recieverMsg = async (msgValue, currentUserId, guestUserId, img, audio,audioDuration) => {
    try {
        return firebase 
        .database()
        .ref('messages/'+ guestUserId)
        .child(currentUserId)
        .push({
            message:{
            sender: currentUserId,
            reciever:guestUserId,
            msg: msgValue,
            img:img,
            audio: audio,
            audioDuration:audioDuration,
            createdAt: format(new Date().getTime(),'h:mm a'),
            date:moment(new Date()).format('ll').toUpperCase(),
            }
        })
    } catch (error) {
        return error
    }
};
