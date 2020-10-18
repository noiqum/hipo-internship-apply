import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDdXY6hPRT76ygoJ6P_HjCGaPy20G3sbCA",
    authDomain: "hipo-internship.firebaseapp.com",
    databaseURL: "https://hipo-internship.firebaseio.com",
    projectId: "hipo-internship",
    storageBucket: "hipo-internship.appspot.com",
    messagingSenderId: "507350787176",
    appId: "1:507350787176:web:c9cdbd9e8e7f626fc687dd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();