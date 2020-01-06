import firebase from "firebase/app";
import "firebase/storage";
require("dotenv").config();

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: "bundles-of-kindness.firebaseapp.com",
    databaseURL: "https://bundles-of-kindness.firebaseio.com",
    projectId: "bundles-of-kindness",
    storageBucket: "bundles-of-kindness.appspot.com",
    messagingSenderId: "962533985971",
    appId: "1:962533985971:web:58f3a5b16555f7edf4aac6",
    measurementId: "G-SB7F0W8M1K"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    firebase,
    storage as
    default
};