import firebase from 'react-native-firebase'


const LogOutUser = async() => {
    try {
        return firebase.auth().signOut();
    } catch (error) {
        return error;
    }
}

export default LogOutUser;