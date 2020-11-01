import firebase from 'react-native-firebase'

export const AddUser = async(name, email, uid, profileImage) => {
    try {
        return firebase.database().ref('users/' + uid)
        .set({
            name: name,
            email: email,
            uuid: uid,
            profileImage: profileImage,
            lastMessage: ''
        })
    } catch (error) {
        return error
    }
};

export const UpdateUser = async (uuid,imgSource) => {
    try {
        return firebase.database().ref('users/'+uuid)
        .update({
            profileImage:imgSource
        })
    } catch (error) {
        return error
    }
}