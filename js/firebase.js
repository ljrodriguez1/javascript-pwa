// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";

var firebaseConfig = {
    apiKey: "AIzaSyD2eR7xpxrAOk320MjWSaQdu4_y2aVxA4s",
    authDomain: "pwa-reich.firebaseapp.com",
    databaseURL: "https://pwa-reich-default-rtdb.firebaseio.com",
    projectId: "pwa-reich",
    storageBucket: "pwa-reich.appspot.com",
    messagingSenderId: "213332410499",
    appId: "1:213332410499:web:3bdcfd4d86a53bf7919bb6"
  };

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
export const messaging = firebase.messaging()