import firebase from 'react-native-firebase'

const loginRequest = async(email,password) => {
    try {
        return firebase.auth().signInWithEmailAndPassword(email,password);
    } catch (error) {
        return error
    }
};

export default loginRequest;