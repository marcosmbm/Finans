import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyAfh3ri30ODOHc-nEJC2uevChn6bHFE15w",
    authDomain: "finans-593f9.firebaseapp.com",
    databaseURL: "https://finans-593f9.firebaseio.com",
    projectId: "finans-593f9",
    storageBucket: "finans-593f9.appspot.com",
    messagingSenderId: "24020967929",
    appId: "1:24020967929:web:d35987323a6ac7a2969d28",
    measurementId: "G-NMMN33TFZM"
};

//Caso não tenha o firebase inicialoziado
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;