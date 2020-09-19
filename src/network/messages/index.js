import { format } from 'date-fns';
import firebase from 'react-native-firebase'

export const senderMsg = async(msgValue, currentUserId, guestUserId, img) => {
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
            createdAt: format(new Date().getTime() ,'h:mm a'),
            }
        })
    } catch (error) {
        return error
    }
};

export const recieverMsg = async (msgValue, currentUserId, guestUserId, img) => {
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
            createdAt: format(new Date(msgValue.createdAt),'YYYY-MM-DD h:mm a'),
            }
        })
    } catch (error) {
        return error
    }
};
